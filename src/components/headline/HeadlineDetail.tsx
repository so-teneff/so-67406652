import React from "react";
import { Headline } from "../../models";
import { createHeadline } from "../../services/HeadlineService";

type Props = {
  selectionState: any;
  onStartNewItem: (...args: any) => Promise<any>;
  onItemSelected: any;
  onItemUpdated: any; 
};

type Actions = {
    type: 'title',
    title: string
} | {
    type: 'attribution',
    attribution: string
} | {
    type: 'teaser',
    teaser: string
}

const reducer: React.Reducer<Headline, Actions> = (state, action) => {
  switch (action.type) {
    case "title":
      return { ...state, title: action.title };
    case "attribution":
        return { ...state, attribution: action.attribution };
    case "teaser":
        return { ...state, teaser: action.teaser };
  }
};

const initialState: Headline = {
  title: "",
  attribution: "",
  teaser: "",
};

export const HeadlineDetail: React.FC<Props> = ({ onStartNewItem }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        value={state.title}
        onChange={(e) => dispatch({ type: "title", title: e.target.value })}
      />

      <label htmlFor="attribution">Attribution</label>
      <input type="text" id="attribution"
        value={state.attribution}
        onChange={(e) => dispatch({ type: "attribution", attribution: e.target.value })} />

      <label htmlFor="teaser">Teaser</label>
      <input type="text" id="teaser"
        value={state.teaser}
        onChange={(e) => dispatch({ type: "teaser", teaser: e.target.value })} />

      <button onClick={() => Promise.all([createHeadline(state), onStartNewItem()])}>Add</button>
    </div>
  );
};

export default HeadlineDetail;
