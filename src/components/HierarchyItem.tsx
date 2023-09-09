import HierarchyLine from "./HierarchyLine";

import styles from "../styles/objecttree.module.css";

interface IProps {
  level: number;
  label: string;
  selected: boolean;
  bottom: boolean;
  onClick: () => void;
}

export default function HierarchyItem(props: IProps) {
  const indents = [];

  for (let i = 0; i < props.level; i++) {
    indents.push(<HierarchyLine variant="empty" />);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
      }}
    >
      {indents}
      <HierarchyLine variant={props.bottom ? "child" : "children"} />
      <button
        className={styles.buttonhover}
        style={{ lineHeight: "30px", cursor: "pointer", color: props.selected ? "green" : "white" }}
        onClick={props.onClick}
      >
        {props.label}
      </button>
    </div>
  );
}
