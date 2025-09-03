import 'reflect-metadata';
import { DataSource } from 'typeorm';
import path from 'path';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.sqlite', // This file will be created in the root of the backend project
  synchronize: true, // Auto-create database schema on every application launch. Only for dev.
  logging: false, // Set to true to see SQL queries
  entities: [path.join(__dirname, 'entities/**/*.ts')], // Load entities from the entities directory
  migrations: [],
  subscribers: [],
});
