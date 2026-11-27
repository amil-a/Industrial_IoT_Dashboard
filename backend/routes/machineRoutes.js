const express = require("express");
const fs = require("fs/promises");
const path = require("path");

const router = express.Router();

const DATA_FILE = path.join(__dirname, "..", "data", "machines.json");
const ALLOWED_STATUSES = ["running", "idle", "fault"];

/**
 * Read and parse the machines array from machines.json.
 */
async function readMachines() {
  const data = await fs.readFile(DATA_FILE, "utf-8");
  return JSON.parse(data);
}

/**
 * Write the updated machines array back to machines.json.
 */
async function writeMachines(machines) {
  await fs.writeFile(DATA_FILE, JSON.stringify(machines, null, 2), "utf-8");
}

// GET /api/machines - Return all machines
router.get("/", async (req, res, next) => {
  try {
    const machines = await readMachines();
    res.status(200).json(machines);
  } catch (error) {
    next(error);
  }
});

// GET /api/machines/:id - Return a single machine by ID
router.get("/:id", async (req, res, next) => {
  try {
    const machines = await readMachines();
    const machine = machines.find((item) => item.id === req.params.id);

    if (!machine) {
      return res.status(404).json({ error: `Machine with id '${req.params.id}' not found.` });
    }

    res.status(200).json(machine);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/machines/:id/status - Update a machine's status
router.patch("/:id/status", async (req, res, next) => {
  try {
    const { status } = req.body || {};

    if (!status || typeof status !== "string" || !ALLOWED_STATUSES.includes(status)) {
      return res.status(400).json({
        error: `Invalid status. Allowed values are: ${ALLOWED_STATUSES.join(", ")}.`,
      });
    }

    const machines = await readMachines();
    const index = machines.findIndex((item) => item.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: `Machine with id '${req.params.id}' not found.` });
    }

    machines[index] = {
      ...machines[index],
      status,
      lastUpdated: new Date().toISOString(),
    };

    await writeMachines(machines);

    res.status(200).json(machines[index]);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
