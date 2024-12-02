const express = require("express");
const db = require("../models");

const ApiRouter = express.Router();

// Create user

ApiRouter.get("/employee/list", async (req, res, next) => {
  try {
    const employees = await db.Employee.find()
      .populate("department")
      .populate("jobs")
      .populate("manager");
    const r = employees.map((e) => {
      return {
        employeeId: e._id,
        fullname:
          e.name.firstName + " " + e.name.middleName + " " + e.name.lastName,
        email: e.account.email,
        department: e.department.name,
        jobs: e.jobs.map((j) => {
          return {
            name: j.name,
            issues: j.issues.map((i) => {
              return {
                title: i.title,
                isCompleted: i.isCompleted,
              };
            }),
          };
        }),
      };
    });
    res.status(200).json(r);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.get("/department/:departmentId", async (req, res, next) => {
  try {
    const departmentId = req.params.departmentId;
    const department = await db.Department.findById(departmentId);
    const departmentName = department.name;
    const manager = await (
      await db.Employee.find()
    ).filter((e) => e.manager == null && e.department == departmentId);
    const managerName = manager.map(
      (e) => e.name.firstName + " " + e.name.middleName + " " + e.name.lastName
    )[0];
    const employees = await db.Employee.find({
      department: departmentId,
      manager: manager[0]._id,
    });
    const r = {
      department: departmentName,
      manager: managerName,
      employees: employees.map((e) => {
        return {
          id: e._id,
          fullname:
            e.name.firstName + " " + e.name.middleName + " " + e.name.lastName,
        };
      }),
    };
    res.status(200).json(r);
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

ApiRouter.post("/employee/:employeeId/add-job", async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    const data = req.body;

    const newJob = await db.Job.create(data);

    const foundEmployee = await db.Employee.findByIdAndUpdate(
      employeeId,
      {
        $push: {
          jobs: newJob._id,
        },
      },
      { new: true }
    );

    res.status(201).json({
      message: "Add a new job successfully",
      result: {
        employeeId: foundEmployee._id,
        fullname:
          foundEmployee.name.firstName +
          " " +
          foundEmployee.name.middleName +
          " " +
          foundEmployee.name.lastName,
        jobList: foundEmployee.jobs,
      },
    });
  } catch (error) {
    res.status(500).json({
      error: {
        status: 500,
        message: error.message,
      },
    });
  }
});

module.exports = ApiRouter;
