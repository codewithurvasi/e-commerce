export default{
  "name": "CartItem",
  "type": "object",
  "properties": {
    "product_id": {
      "type": "string",
      "description": "Reference to product"
    },
    "product_name": {
      "type": "string",
      "description": "Product name for display"
    },
    "product_image": {
      "type": "string",
      "description": "Product image URL"
    },
    "price": {
      "type": "number",
      "description": "Price at time of adding"
    },
    "quantity": {
      "type": "number",
      "default": 1,
      "description": "Quantity in cart"
    }
  },
  "required": [
    "product_id",
    "product_name",
    "price"
  ]
}