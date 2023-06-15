import { Button, TextField } from '@mui/material'
import React, { FormEvent, useState } from 'react'
import { api } from '../service/api'

interface Product {
  name: string
  description: string
  quantity: number
  price: number
}

export const CreateProductForm = () => {

  const [product, setProduct] = useState<Product>({
    name: '',
    description: '',
    quantity: 0,
    price: 0
  })


  const handleFormSubmit = async (event: FormEvent) => {
    event.preventDefault()

    try {
      if (Object.values(product).some((value) => value === '')) {
        alert('Preencha todos os campos!')
        return
      }
  
      const result = await api.post('/item/criar', {
        nome: product.name,
        descricao: product.description,
        quantidade: product.quantity,
        preco: product.price * 100,
        tipo: ''
      })
  
      if (result.status === 200) {
        alert('Produto criado com sucesso!')
        setProduct({
          name: '',
          description: '',
          quantity: 0,
          price: 0
        })
      } else {
        alert('Erro ao criar produto!')
      }
    } catch (error) {
      alert('Erro ao criar produto!')
    }

    
  }

  const handleClearFields = () => {
    setProduct({
      name: '',
      description: '',
      quantity: 0,
      price: 0
    })
  }

  return (
    <div style={{
      width: '80%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      paddingBottom: '2rem',
    }}>

      <h3>Criar novo produto</h3>

      <form onSubmit={handleFormSubmit} style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: '1rem',
        width: '100%',
      }}>
        <TextField
          label="Nome"
          name="nome"
          value={product.name}
          onChange={(e) => setProduct((prev) => {
            return {
              ...prev,
              name: e.target.value
            }
          })}
          fullWidth
          required
        />
        <TextField
          label="Descrição"
          name="descricao"
          value={product.description}
          onChange={(e) => setProduct((prev) => {
            return {
              ...prev,
              description: e.target.value
            }
          })}
          fullWidth
          required
        />
        <TextField
          label="Preço"
          name="preco"
          type='number'
          value={product.price === 0 ? '' : product.price}
          onChange={(e) => setProduct((prev) => {
            return {
              ...prev,
              price: Number(e.target.value)
            }
          })}
          fullWidth
          required
        />
        <TextField
          label="Quantidade"
          name="quantidade"
          type='number'
          value={product.quantity === 0 ? '' : product.quantity}
          onChange={(e) => setProduct((prev) => {
            return {
              ...prev,
              quantity: Number(e.target.value)
            }
          })}
          fullWidth
          required
        />
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
        }}>
          <Button variant="outlined" onClick={handleClearFields}>
            Limpar
          </Button>
          <Button variant="contained" type="submit">
            Criar
          </Button>
        </div>
      </form>

    </div>
  )
}