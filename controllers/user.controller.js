import { request, response } from "express";

export const userGet = (req = request, res = response) => {
  const query = req.query;
  res.json({
    msg: "GET API - controller",
    query,
  });
};

export const userPut = (req, res = response) => {
  const id = req.params.id;
  res.json({
    msg: "PUT API - controller",
    id,
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
