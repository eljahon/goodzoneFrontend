// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.statusCode = 200
  res.json([
    {
      id: 1,
      category_id: 1,
      name: 'Телевизор LG 32Ij570',
      price: 2461000,
      image: 'images/product_1.png'
    },
    {
      id: 2,
      category_id: 1,
      name: 'Телевизор Samsung UE49N55',
      price: 5510500,
      image: 'images/product_2.png'
    },
    {
      id: 3,
      category_id: 1,
      name: 'Телевизор Sony KDL-40WD653',
      price: 4547500,
      image: 'images/product_3.png'
    },
    {
      id: 4,
      category_id: 1,
      name: 'Телевизор Roison RE320022',
      price: 1230500,
      image: 'images/product_4.jpg'
    },
  ])
}
