-- This needs to be run first or you should be able to just use my data owusu
CREATE TABLE IF NOT EXISTS pp_users (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    business_name VARCHAR(100) NOT NULL,
    contact_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS pp_suppliers (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS pp_products (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    sku VARCHAR(30)  NOT NULL UNIQUE,      -- the char version of the id the cart uses: box, labels, cards
    name VARCHAR(100) NOT NULL,
    description VARCHAR(255) NOT NULL,
    category ENUM('shipping','labels','print') NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    unit VARCHAR(30)  NOT NULL, -- is it per box, per item, etc
    image VARCHAR(100) NOT NULL,
    image_alt VARCHAR(255) NOT NULL,
    supplier_id INT UNSIGNED NOT NULL,
    FOREIGN KEY (supplier_id) REFERENCES pp_suppliers(id)
);

CREATE TABLE IF NOT EXISTS pp_orders (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT UNSIGNED NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    status ENUM('received','in_production','awaiting_dispatch','delivered') NOT NULL DEFAULT 'received',
    buyer_business VARCHAR(100) NOT NULL, -- business that placed order
    contact VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(30)  NOT NULL DEFAULT '',
    address VARCHAR(150) NOT NULL,
    city VARCHAR(80)  NOT NULL,
    zip VARCHAR(20)  NOT NULL,
    notes VARCHAR(1000) NOT NULL DEFAULT '',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES pp_users(id)
);

CREATE TABLE IF NOT EXISTS pp_order_items (
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id INT UNSIGNED NOT NULL,
    product_id INT UNSIGNED NOT NULL,
    supplier_id INT UNSIGNED NOT NULL,
    product_name VARCHAR(100) NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    quantity INT UNSIGNED NOT NULL,
    FOREIGN KEY (order_id) REFERENCES pp_orders(id),
    FOREIGN KEY (product_id) REFERENCES pp_products(id),
    FOREIGN KEY (supplier_id) REFERENCES pp_suppliers(id)
);

INSERT IGNORE INTO pp_suppliers (id, name) VALUES
    (1, 'Northstar Packaging'),
    (2, 'BrightMark Print'),
    (3, 'Paper & Press Co.');

INSERT IGNORE INTO pp_products (sku, name, description, category, price, unit, image, image_alt, supplier_id) VALUES
    ('box', 'Shipping Box', 'Durable everyday shipper for small business orders.', 'shipping', 1.20, 'unit', 'cardboard-boxes.jpg', 'Cardboard shipping boxes stacked on top of each other', 1),
    ('labels', 'Custom Roll Labels', 'Branded labels for your products and packaging.', 'labels', 0.08, 'label', 'roll-labels.jpg', 'Roll of labels, blank', 2),
    ('cards', 'Business Cards', 'Clean, professional cards for your team and events.', 'print', 18.00, '250', 'business-cards.jpg', 'Stack of business cards', 3),
    ('mailer', 'Recycled Padded Mailer', 'Lightweight protection for small, non-fragile goods.', 'shipping', 0.72, 'unit', 'padded-mailer.jpg', 'Image of a plain padded mailer', 1),
    ('postcards', 'Marketing Postcards', 'Colorful printed pieces for promotions and inserts', 'print', 32.00, '100', 'marketing-postcards.jpg', 'Image of different, unique marketing postcards', 3);