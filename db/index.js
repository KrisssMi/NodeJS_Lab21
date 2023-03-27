const fs = require("fs");
const config = require("./../config");

let cellPhones = require("./cellphones") || [];

module.exports = {
  getPhones: () => cellPhones,

  getPhoneById: (id) => cellPhones.find((phone) => phone.id === Number(id)),

  addPhone(fields) {
    try {
      const { fullName, phone } = fields;
      if (!fullName || !phone) {
        throw new Error("Empty fullName or phone fields");
      }

      if (cellPhones.find((phone) => phone.fullName === fullName)) {
        throw new Error("Duplicate fullName");
      }

      const phoneRegExp = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
      if (!phoneRegExp.test(phone)) {
        throw new Error("Invalid phone format");
      }

      const newPhone = {
        id: cellPhones.length,
        fullName,
        phone,
      };
      cellPhones.push(newPhone);
      save();
      return newPhone;
    } catch (err) {
      console.log(err);
    }
  },

  updatePhone(fields) {
    try {
      const { id, fullName, phone } = fields;
      if (!id || !fullName || !phone) {
        throw new Error("Empty id, fullName or phone fields");
      }
      let targetPhone = cellPhones.find((phone) => phone.id === Number(id));
      if (!targetPhone) {
        throw new Error("Invalid record id");
      }
      const phoneRegExp = /^\+375\(\d{2}\)\d{3}-\d{2}-\d{2}$/;
      if (!phoneRegExp.test(phone)) {
        throw new Error("Invalid phone format");
      }
      targetPhone.fullName = fullName;
      targetPhone.phone = phone;
      save();
      return targetPhone;
    } catch (err) {
      console.log(err);
    }
  },

  deletePhone(id) {
    try {
      let targetPhone = cellPhones.find((phone) => phone.id !== Number(id));
      if (!targetPhone) {
        throw new Error("Invalid record id");
      }
      cellPhones = cellPhones.filter((phone) => phone.id !== Number(id));
      save();
      return targetPhone;
    } catch (err) {
      console.log(err);
    }
  },
};

function save() {
  fs.writeFile(
    "./db/cellphones.json",
    JSON.stringify(cellPhones, null, "  "),
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
}
