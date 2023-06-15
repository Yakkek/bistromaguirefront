import { Table, TableHead, TableBody, TableRow, TableCell, Button, TextField } from '@mui/material';
import { Header } from '../components/Header';
import { FormEvent, useEffect, useState } from 'react';
import { TableSales } from '../components/TableSales';
import { api } from '../service/api';
import { CreateProductForm } from '../components/CreateProductForm';

interface Product {
  id: number
  name: string
  description: string
  quantity: number
  price: number
}

export const AdminPanel = () => {

  const [editingItem, setEditingItem] = useState<Product | null>(null);

  const [data, setData] = useState<Product[]>([]);

  const handleEditItemClick = (item: Product) => {
    setEditingItem(item);
  };

  const handleSaveEdit = async (e: FormEvent) => {

    e.preventDefault()

    if(!editingItem) {
      return
    }

    try {

      if (!Object.values(editingItem).every((value) => value)) {
        alert('Preencha todos os campos');
        return;
      }

      await api.put(`/item/atualizar`, {
        id: editingItem.id,
        nome: editingItem.name,
        descricao: editingItem.description,
        quantidade: editingItem.quantity,
        preco: editingItem.price * 100,
        tipo: ''
      })

      setEditingItem(null)
      getData()
    } catch (error) {
      alert('Erro ao editar o item! Informe todos os campos corretamente')
      console.log(error)
    }

  };

  const getData = async () => {

    try {
      const result = await api.get('/item/buscar-todos')

      const data = result.data

      const list: Product[] = []

      data.map((item: any) => {

        list.push({
          id: item.id,
          name: item.nome,
          description: item.descricao,
          quantity: item.quantidade,
          price: item.preco / 100,
        })

      })

      setData(list)
    } catch (error) {
      setData([])
      console.log(error)
    }

  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh',
        width: '100%',
        gap: '40px',
      }}
    >
      <Header type='admin' />

      <TableSales />

      <div
        style={{
          width: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          paddingBottom: '2rem',
        }}
      >

        <h3>
          Tabela de itens do menu
        </h3>
        <Table>
          <TableHead style={{ backgroundColor: '#ccc' }}>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Quantidade</TableCell>
              <TableCell>Preço</TableCell>
              <TableCell>Editar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>
                  {item.price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell>
                  <Button variant="outlined" onClick={() => handleEditItemClick({
                    id: item.id,
                    name: item.name,
                    description: item.description,
                    quantity: item.quantity,
                    price: item.price,
                  })}>Editar</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {editingItem && (
          <div>
            <h4>Editar Item</h4>
            <form onSubmit={handleSaveEdit} style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridTemplateRows: '1fr 1fr 1fr',
              gap: '10px',
            }}>
              <TextField
                label="Nome"
                variant="outlined"
                value={editingItem.name}
                onChange={(e) => {
                  setEditingItem({
                    ...editingItem,
                    name: e.target.value,
                  });
                }}
              />
              <TextField
                label="Descrição"
                variant="outlined"
                value={editingItem.description}
                onChange={(e) => {
                  setEditingItem({
                    ...editingItem,
                    description: e.target.value,
                  });
                }}
              />
              <TextField
                label="Quantidade"
                variant="outlined"
                type='number'
                value={editingItem.quantity == 0 ? '' : editingItem.quantity}
                onChange={(e) => {
                  setEditingItem({
                    ...editingItem,
                    quantity: Number(e.target.value),
                  });
                }}
              />
              <TextField
                label="Preço"
                variant="outlined"
                type='number'
                value={editingItem.price == 0 ? '' : editingItem.price}
                onChange={(e) => {
                  setEditingItem({
                    ...editingItem,
                    price: Number(e.target.value),
                  });
                }}
              />
              <Button variant="outlined" type="button" onClick={() => {
                setEditingItem(null);
              }}>Cancelar</Button>
              <Button variant="contained" type="submit" onClick={handleSaveEdit}>Salvar</Button>
            </form>
          </div>
        )}

      </div>

      <CreateProductForm />


    </div>
  );
};