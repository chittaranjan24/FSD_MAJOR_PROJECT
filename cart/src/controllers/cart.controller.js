const cartModel = require("../models/cart.model");

async function getCart(req, res) {
  try {
    const user = req.user;

    let cart = await cartModel.findOne({ user: user.id });

    if (!cart) {
        cart = new cartModel({ user: user.id, items: [] });
        await cart.save();
    }

    res.status(200).json({
        cart,
        totals: {
            itemCount: cart.items.length,
            totalQuantity: cart.items.reduce((sum, item) => sum + item.quantity, 0)
        }
    });    
  } catch (error) {
    console.log("Error getting cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function addItemToCart(req, res) {
  try {
    const { productId, quantity } = req.body;
    
    const user = req.user;

    let cart = await cartModel.findOne({ user: user.id });

    if (!cart) {
      cart = new cartModel({ user: user.id, items: [] });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex > -1) {
      cart.items[existingItemIndex].quantity = Number(cart.items[existingItemIndex].quantity) + Number(quantity);
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();

    return res.status(200).json({
      message: "Item added to cart",
      cartData: cart
    });
  } catch (error) {
    console.log("Error adding item to cart:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function updateCartItem(req, res) {
  try {
    const { productId } = req.params;

    const { quantity } = req.body;

    const user = req.user;

    const cart = await cartModel.findOne({ user: user.id });

    if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
    }

    const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId);

    if (existingItemIndex < 0) {
        return res.status(404).json({ message: 'Item not found' });
    }

    cart.items[ existingItemIndex ].quantity = quantity;

    await cart.save();
    
    res.status(200).json({ message: 'Item updated', cart });    
  } catch (error) {
    console.log("Error updating cart item:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  addItemToCart,
  getCart,
  updateCartItem
};