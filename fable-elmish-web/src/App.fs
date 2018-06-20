module App

open Elmish
open Elmish.Browser.Navigation
//open Elmish.Browser.UrlParser
//open Fable.Core
open Fable.Core.JsInterop
open Fable.Import
//open Fable.Import.Browser

importAll "../sass/main.sass"

open Fable.Helpers.React
open Fable.Helpers.React.Props

type Sq =
    | Variable of int Option
    | Static of int

type Model = Sq List List

type Coord = int

type Msg =
    | Fill of Coord * int Option
    | NoChange

(*************************************)



let fill i dispatch (v: React.FormEvent) =
    let input = v.target.ToString ()

    let iparse str =
        try Some (int str) with
        | :? System.FormatException -> None

    match (iparse input, String.length input) with
    | (Some vi, 1) -> dispatch (Fill (i, Some vi))
    | (_, 0) -> dispatch (Fill (i, None))
    | (_, _) -> dispatch NoChange

let valueSq mv =
    match mv with
    | Some v -> sprintf "%A" v
    | None -> ""

let renderSq d l sq =
    match sq with
    | Variable v ->
        div [ClassName "su-square"]
            [input [Type "text"; DefaultValue (valueSq v); ClassName "sq-input"; OnInput (fill l d)]]
    | Static v ->
        div [ClassName "su-square su-input"]
            [strong [] [str (sprintf "%A" v)]]

let renderRow d l r =
    div [ClassName "su-row"] (List.mapi (fun i v -> renderSq d (l*9 + i) v) r)

let replace coord vIn model =
    List.mapi (fun i l ->
        if coord / 9 = i
        then List.mapi (fun i v ->
            if coord % 9 = i
            then vIn
            else v) l
        else l) model



(*************************************)

let init () =
    (List.replicate 9 (List.replicate 9 (Variable None)), Cmd.none)

let update msg model =
    (match msg with
    | Fill (l,v) -> replace l (Variable v) model
    | NoChange -> model
    , Cmd.none)

let view model dispatch =
    div [] [
        div [ClassName "su-grid"]
            (List.mapi (renderRow dispatch) model)
    ]




open Elmish.React
//open Elmish.Debug
//open Elmish.HMR

// App
Program.mkProgram init update view
//|> Program.toNavigable (parseHash pageParser) urlUpdate
//#if DEBUG
//|> Program.withDebugger
//|> Program.withHMR
//#endif
|> Program.withReact "elmish-app"
|> Program.run
