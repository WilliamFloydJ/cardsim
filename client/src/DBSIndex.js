const DBSIndex = (props) => {
  return (
    <div className="DBSIndex">
      <h1>{props.val.card_name}</h1>
      <img src={props.val.card_url} />
    </div>
  );
};

export default DBSIndex;
