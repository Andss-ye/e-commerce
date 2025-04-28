import { getClient } from '../helpers/db.js';

export async function createUsersCollection() {
  const client = await getClient();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "name",
        "email",
        "password",
        "document_type",
        "document_number",
        "phone",
        "place",
      ],
      properties: {
        name: {
          bsonType: "string",
        },
        email: {
          bsonType: "string",
          pattern: "/^\+?[1-9][0-9]{7,14}$/"
        },
        password: {
          bsonType: "string",
          pattern: "^[A-Za-z0-9]{8,12}$",
          minLength: 8,
          maxLength: 12,
        },
        document_type: {
          bsonType: "string",
          enum: ["CC", "CE", "PS", "PEP"],
        },
        phone: {
          bsonType: 'string',
          pattern: "^\\+?[1-9][0-9]{7,14}$"
        },
        place: {
          bsonType: 'object'
        },
        user_type: {
          bsonType: 'array',
          items: {
            bsonType: 'string'
          }
        },
        active: {
          bsonType: 'bool'
        }
      },
    },
  }

  try {
    await db.createCollection("users", { validator });
    console.log("Collection 'users' created");
  } catch (error) {
    console.error(error)
  }
}

export async function createProductsCollection() {
  const client = await getClient();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        "code",
        "name",
        "description",
        "images",
        "price",
        "stock",
        "categories",
        "condition"
      ],
      properties: {
        code: {
          bsonType: 'string'
        },
        name: {
          bsonType: 'string'
        },
        description: {
          bsonType: 'string'
        },
        images: {
          bsonType: 'array',
          items: {
            bsonType: 'string',
            pattern: "/^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/"
          }
        },
        price: {
          bsonType: 'double',
        },
        stock: {
          bsonType: 'int'
        },
        categories: {
          bsonType: 'objectId'
        },
        brand: {
          bsonType: 'string'
        },
        condition: {
          bsonType: 'string',
          enum: ['new', 'used', 'remanufactured']
        },
        vat: {
          bsonType: 'int'
        },
        active: {
          bsonType: 'bool'
        }
      }
    }
  }

  try {
    await db.createCollection("products", { validator });
    console.log("Collection 'products' created");
  } catch (error) {
    console.error(error)
  }
}

export async function createCategoriesCollection() {
  const client = await getClient();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'code',
        'name'
      ],
      properties: {
        code: {
          bsonType: 'string'
        },
        name: {
          bsonType: 'string'
        },
        active: {
          bsonType: 'bool'
        }
      }
    }
  }

  try {
    await db.createCollection("categories", { validator });
    console.log("Collection 'categories' created");
  } catch (error) {
    console.error(error)
  }
}

export async function createPaymentMethodsCollection() {
  const client = await getClient();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'code',
        'name'
      ],
      properties: {
        code: {
          bsonType: 'string'
        },
        name: {
          bsonType: 'string'
        },
        active: {
          bsonType: 'bool'
        }
      }
    }
  }

  try {
    await db.createCollection("payment_methods", { validator });
    console.log("Collection 'payment_methods' created");
  } catch (error) {
    console.error(error)
  }
}

export async function createSalesCollection() {
  const client = await getClient();
  const db = client.db(process.env.DB_NAME);

  const validator = {
    $jsonSchema: {
      bsonType: 'object',
      required: [
        'date',
        'payment_method',
        'client',
        'seller',
        'details'
      ],
      properties: {
        reference: {
          bsonType: 'int'
        },
        date: {
          bsonType: 'date'
        },
        payment_method: {
          bsonType: 'objectId'
        },
        client: {
          bsonType: 'objectId'
        },
        seller: {
          bsonType: 'objectId'
        },
        details: {
          bsonType: 'array',
          items: {
            bsonType: 'object',
            required: [
              'product',
              'quantity',
              'price'
            ],
            properties: {
              product: {
                bsonType: 'objectId'
              },
              quantity: {
                bsonType: 'int'
              },
              price: {
                bsonType: 'int'
              }
            }
          }
        }
      }
    }
  }

  try {
    await db.createCollection("sales", { validator });
    console.log("Collection 'sales' created");
  } catch (error) {
    console.error(error)
  }
}