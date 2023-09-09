interface IProps {
  variant: "child" | "children" | "empty";
}

export default function HierarchyLine(props: IProps) {
  return (
    <div style={{ height: "35px", width: "35px", position: "relative" }}>
      {props.variant !== "empty" && (
        <>
          <div
            style={{
              width: "2px",
              backgroundColor: "#fafafa",
              height: props.variant === "children" ? "100%" : "50%",
              position: "absolute",
              left: "50%",
              top: "0",
              transform: "translateX(-50%)",
            }}
          />
          <div
            style={{
              height: "2px",
              backgroundColor: "#fafafa",
              width: "calc(50% + 1px)",
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-1px, -50%)",
            }}
          />
        </>
      )}
    </div>
  );
}
