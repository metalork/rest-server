const mongoose = require("mongoose");
const history = require("mongoose-history");
const Schema = mongoose.Schema;

let productoSchema = new Schema({
  nombre: { type: String, required: [true, "El nombre es necesario"] },
  precioUni: { type: Number, required: [true, "El precio únitario es necesario"] },
  descripcion: { type: String, required: false },
  disponible: { type: Boolean, required: true, default: true },
  categoria: { type: Schema.Types.ObjectId, ref: "categoria", required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario" },
  img: { type: String, required: false }
});
productoSchema.plugin(history, { customCollectionName: "myProgram" });

module.exports = mongoose.model("Producto", productoSchema);
