import { useEffect, useState } from "react"
import { Header } from "../components/Header"
import { api } from '../service/api'
import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { Product, useCart } from "../store/cart"



export const Menu = () => {

  const [products, setProducts] = useState<Product[]>([])

  const { addProduct, updateQuantity, products: cartProducts, removeProduct } = useCart()

  const getProducts = async () => {
    const res = await api.get('/item/buscar-todos')

    const data = res.data

    const listProducts: Product[] = []
    data.map((product: any) => {

      const { id, nome, descricao, quantidade, preco } = product

      const newProduct = {
        id,
        name: nome,
        description: descricao,
        quantity: quantidade,
        price: preco,
        quantityCart: 0
      }

      listProducts.push(newProduct)

    })

    setProducts(listProducts)

  }

  useEffect(() => {

    getProducts()

  }, [])


  const handleAddProduct = (product: Product) => {

    const productExists = cartProducts.find(item => item.id === product.id)

    if (productExists) {
      updateQuantity(product.id, 'add')
      return
    }

    addProduct({
      ...product,
      quantityCart: 1
    })

  }

  const handleRemoveProduct = (product: Product) => {

    const productExists = cartProducts.find(item => item.id === product.id)

    if (productExists?.quantityCart === 1 ) {
      removeProduct(product.id)
      return
    }

    if (productExists) {
      updateQuantity(product.id, 'subtract')
    }

  }

  return (
    <div>
      <Header />

      <div style={{
        padding: '2rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
      }}>
        <h1>Menu</h1>
        <Grid container spacing={2}>
          {products.map((item) => (
            <Grid item key={item.id} xs={12} sm={6} md={4}>
              <Card sx={{
                border: "1px solid #ccc"
              }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                  <Typography variant="overline" color="text.secondary">
                    {
                      `Adicionados: ao carrinho: ${
                        cartProducts.find(product => product.id === item.id)?.quantityCart || 0
                      }`
                    }
                  </Typography>
                  <Typography variant="h6" component="div" mt={2}>
                    R${(item.price / 100).toLocaleString('pt-br', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Button
                    variant="contained" style={{
                      marginRight: '1rem',
                      backgroundColor: '#f81404',
                      color: '#fff'
                    }} 
                    
                    onClick={() => {
                      handleRemoveProduct(item)
                    }}>
                    -
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => {
                      handleAddProduct(item)
                    }}>
                    +
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </div>
  )
}
