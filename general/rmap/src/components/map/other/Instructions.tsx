import { FC, Fragment } from "react";

interface Props {
  selected: boolean
}

const Instructions: FC<Props> = ({
  selected
}) => {
  return (
    <Fragment>
      <div>
        <p className="p-0 m-0">
          Hold <em>Shift</em> and click without dragging for a regular polygon
        </p>
        <p className="p-0 m-0">
          Hold <em>Shift</em> and <em>Alt</em> and drag for a freehand polygon
        </p>
        <p className="p-0 m-0">
          Hold <em>Alt</em> and click without dragging for a circle
        </p>
        <p className="p-0 m-0">
          Hold <em>Ctrl / &#x2318;</em> and drag to move/add a vertex
        </p>
        <p className="p-0 m-0">
          Hold <em>Ctrl / &#x2318;</em> and double click to remove a vertex
        </p>
      </div>
      <div className="mx-0 mt-1 mb-3 p-1 w-100 jumbotron shadow shadow">
        <p>Currently, the Eiffel Tower is{selected ? "" : " not"} covered</p>
      </div>
    </Fragment>
  );
};

export default Instructions;
