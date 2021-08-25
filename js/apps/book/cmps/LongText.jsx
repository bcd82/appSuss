export const LongText = ({ text, isLongTxtShown, onClickMore }) => {
  let txtToDisplay = "";
  let isTxtLong = false;
  if (!text) return "No Description Available";
  if (text.length > 100) {
    isTxtLong = true;
    if (!isLongTxtShown) {
      txtToDisplay = `${text.substring(0, 100)}...`;
    } else txtToDisplay = text;
  } else txtToDisplay = text;

  return (
    <div className="text-box">
      <p>{txtToDisplay}</p>
      {isTxtLong && !isLongTxtShown && (
        <p className="more-less" onClick={onClickMore}>
          {" "}
          More...
        </p>
      )}
      {isTxtLong && isLongTxtShown && (
        <p className="more-less" onClick={onClickMore}>
          {" "}
          Less...
        </p>
      )}
    </div>
  );
};
