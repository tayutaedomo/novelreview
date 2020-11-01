exports.novelreview_store = (req, res) => {
  try {
    main(req.body);

    res.send('OK');

  } catch(err) {
    console.error(err);

    res.status(500);
    res.send('Internal Server Error')
  }
};


const main = (params) => {
  // TODO
  console.log(JSON.stringify(params));
};
