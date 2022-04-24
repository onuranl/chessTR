const chart_service = require("../services/chart-service");

async function get(req, res) {
  console.log("hey")
  try {
    const result = await chart_service.get();
    

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      error: error.message || "Bir hata meydana geldi",
    });
  }
}

async function getByID(req, res) {
  try {
    const result = await chart_service.getByID(req.params.id);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      error: error.message || "Bir hata meydana geldi",
    });
  }
}

async function create(req, res) {
  const { chartHistory } = req.body;

  const payload = {
    chartHistory
  };

  console.log({chartHistory})

  try {
    const result = await chart_service.create(payload);

    return res.status(200).json(result);
  } catch (error) {
    return res.status(400).json({
      error: error.message || "Bir hata meydana geldi",
    });
  }
}

async function update(req, res) {
  const { chart } = req.body;

  const payload = {
    chart
  };

  try {
    const result = await chart_service.update(req.params.id, payload);

    return res.status(200).json("Successfully updated");
  } catch (error) {
    return res.status(400).json({
      error: error.message || "Bir hata meydana geldi",
    });
  }
}

module.exports = {
  get,
  getByID,
  create,
  update
};