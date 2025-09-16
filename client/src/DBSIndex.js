const DBSIndex = (props) => {
  return (
    <div className="DBSIndex">
      <h1>{props.card_name}</h1>
      <img src={props.card_url} />
    </div>
  );
};

export default DBSIndex;
