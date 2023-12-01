import express from "express";

 
declare global {
  namespace Express {
    interface Request {
      usuario_id?: Record<string>
    }
  }
}