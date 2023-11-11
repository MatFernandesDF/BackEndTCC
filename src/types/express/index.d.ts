import express from "express";

// Adicionar uma propriedade user_id à interface Request
declare global {
  namespace Express {
    interface Request {
      user_id?: Record<string>
    }
  }
}