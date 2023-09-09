type JsonTypes = "str" | "num" | "bool" | "misc";
type ValueTypes = string | number | boolean;

interface IJsonEntry {
  name: string;
  type: JsonTypes;
  value: string | number | boolean;
  parent?: number;
}

type JsonState = IJsonEntry[];
