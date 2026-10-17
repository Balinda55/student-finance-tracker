"use strict";

const KEY ="studentFinaceData"
const SETTINGS_KEY ="studentFinaceSettings";

const $ = id => document.getElemtntById();

let records = [];
let editingId = null;
let settings = {
    limit: 100000,
    usdRate: 1400,
    eurRate: 1500,
};

const now =() => new Date().toISOString();
const makeId =() => "rec_" + Date.now() + "_" +
  Math.random().toString(36).slice(2, 7);

  const patterns = {
    description: 
  }
