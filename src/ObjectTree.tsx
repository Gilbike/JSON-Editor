import HierarchyItem from "./components/HierarchyItem";
import styles from "./styles/objecttree.module.css";

interface IProps {
  state: JsonState;
  selected: number;
  onSelect: (id: number) => void;
}

export default function ObjectTree(props: IProps) {
  return (
    <div className={styles.main}>
      <div>JSON</div>
      {props.state.map((x, index) => (
        <HierarchyItem
          label={x.name}
          level={x.parent ? 1 : 0}
          selected={props.selected === index}
          bottom={index == props.state.length - 1}
          onClick={() => props.onSelect(index)}
          key={index}
        />
      ))}
    </div>
  );
}
