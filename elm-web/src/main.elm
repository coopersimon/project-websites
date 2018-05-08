import Html exposing (..)
import Html.Attributes exposing (..)
import Html.Events exposing (onInput)
import Http
import Json.Decode as Decode

main =
    --Html.beginnerProgram {model=model, view=view, update=update}
    Html.program
        { init=init
        , view=view
        , update=update
        , subscriptions=(always Sub.none)
        }

------------

type alias Metadata = List Int

getSudoku : Http.Request Metadata
getSudoku =
    Http.get "/sudoku" decodeSudoku

decodeSudoku : Decode.Decoder Metadata
decodeSudoku =
    Decode.field "sudoku" (Decode.list Decode.int)

addToRow : List Sq -> Int -> List Sq
addToRow l v =
    case v of
        0 -> l ++ [Variable Nothing]
        _ -> l ++ [Static v]

generateModel : Metadata -> Model
generateModel data =
    let makeRows i model row d =
        case d of
            []   -> model
            h::t -> if i % 9 == 8
                    then makeRows (i+1) (model ++ [addToRow row h]) [] t
                    else makeRows (i+1) model (addToRow row h) t
    in makeRows 0 [] [] data

newSudokuModel : Cmd Msg
newSudokuModel =
    Http.send FromJson getSudoku 

------------

type Sq
    = Variable (Maybe Int)
    | Static Int

type alias Model = List (List Sq)

type alias Coord = Int

replace : Coord -> Sq -> Model -> Model
replace coord val model =
    List.indexedMap (\i l ->
        if coord // 9 == i
        then List.indexedMap (\i v -> if coord % 9 == i
                                      then val
                                      else v) l
        else l)
        model

renderSq : Coord -> Sq -> Html Msg
renderSq l sq =
    case sq of
        Variable v ->
            div [class "su-square"]
                [input [type_ "text", value (valueSq v), class "sq-input", onInput (fill l)] []]
        Static v ->
            div [class "su-square sq-input"]
                [strong [] [text (toString v)]]

renderRow : Coord -> List Sq -> Html Msg
renderRow l r =
    div [class "su-row"] (List.indexedMap (\i v -> renderSq (l*9 + i) v) r)

valueSq : Maybe Int -> String
valueSq mv =
    case mv of
        Just v -> toString v
        Nothing -> ""

fill : Coord -> String -> Msg
fill i v =
    case (String.toInt v, String.length v) of
        (Ok vi, 1) -> Fill (i, Just vi)
        (_, 0) -> Fill (i, Nothing)
        (_, _) -> NoChange

--------------------------

init : (Model, Cmd Msg)
init =
    (List.repeat 9 (List.repeat 9 (Variable Nothing)), newSudokuModel)

type Msg
    = Fill (Coord, Maybe Int)
    | NoChange
    | FromJson (Result Http.Error Metadata)

update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    (case msg of
        Fill (l,v) -> replace l (Variable v) model
        NoChange -> model
        FromJson (Ok m) -> generateModel m
        FromJson (Err _) -> model
    , Cmd.none)

view : Model -> Html Msg
view model =
    div [] [
        node "link" [rel "stylesheet", href "/index.css"] [],
        div [class "su-grid"]
            (List.indexedMap renderRow model)
    ]
