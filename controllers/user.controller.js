import { response } from "express";

export const userGet = (req, res = response) => {
  res.json({
    msg: "GET API - controller",
  });
};

export const userPut = (req, res = response) => {
  res.json({
    msg: "PUT API - controller",
  });
};

export const userPost = (req, res = response) => {
  const body = req.body;

  res.json({
    msg: "POST API - controller",
    body,
  });
};

export const userDelete = (req, res = response) => {
  res.json({
    msg: "DELETE API - controller",
  });
};

export const userPatch = (req, res = response) => {
  res.json({
    msg: "PATCH API - controller",
  });
};
