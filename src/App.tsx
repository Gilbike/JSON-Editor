import { useMemo, useState } from "react";
import { Button } from "react-bootstrap";
import { MdAdd } from "react-icons/md";

import Edit from "./Edit";
import ObjectTree from "./ObjectTree";

import styles from "./styles/main.module.css";

const typeDefaults = {
  str: "",
  num: 1,
  bool: true,
  misc: "",
};

function App() {
  const [jsonObject, setJsonObject] = useState<IJsonEntry[]>([]);
  const [selected, setSelected] = useState<number>(-1);
  const [previewed, setPreviewed] = useState<boolean>(false);

  const json = useMemo(() => {
    if (jsonObject.length == 0) {
      return "{}";
    }

    let raw = "{\n";
    jsonObject.forEach((element, index) => {
      const value = `${element.type === "str" ? '"' : ""}${element.value}${element.type === "str" ? '"' : ""}`;

      raw += `"${element.name}": ${value}${index != jsonObject.length - 1 ? "," : ""}\n`;
    });
    raw += "}";

    return raw;
  }, [jsonObject]);

  const addEmpty = () => {
    setJsonObject((value) => {
      return [
        ...value,
        {
          name: "kulcs",
          type: "str",
          value: "",
        },
      ];
    });
    setSelected(jsonObject.length);
  };

  const changeDataValue = (type: "name" | "type" | "value", value: JsonTypes | ValueTypes) => {
    const newState = [...jsonObject];
    newState[selected][type] = value as any;

    setJsonObject(newState);
  };

  const getCurrentlySelected = () => {
    return jsonObject[selected];
  };

  const deleteKey = () => {
    setJsonObject((value) => value.filter((_, index) => index !== selected));
    setSelected(-1);
  };

  return (
    <>
      <div className={styles.side}>
        <ObjectTree
          state={jsonObject}
          selected={selected}
          onSelect={(id: number) => {
            setSelected(id);
          }}
        />
        <Button onClick={addEmpty} variant="success" className={styles.addButton}>
          <MdAdd size={20} />
          Hozzáadás
        </Button>
      </div>
      <div className={styles.side}>
        <div className={styles.previewContainer}>
          <Button variant="outline-secondary" onClick={() => setPreviewed((value) => !value)}>
            Előnézet
          </Button>
        </div>
        {previewed && <code className={styles.preview}>{json}</code>}
        <Edit
          name={getCurrentlySelected()?.name || ""}
          setName={(name) => changeDataValue("name", name)}
          type={getCurrentlySelected()?.type || "str"}
          setType={(type) => {
            changeDataValue("type", type);
            changeDataValue("value", typeDefaults[type]);
          }}
          value={getCurrentlySelected()?.value || ""}
          setValue={(val) => changeDataValue("value", val)}
          onDelete={deleteKey}
        />
      </div>
    </>
  );
}

export default App;
