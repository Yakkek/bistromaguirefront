import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import { api } from '../service/api';
import { useEffect, useState } from 'react';
import { saveAs } from 'file-saver';

export interface Sale {
  id: number
  amount: number
  date: string
  client: string
}


export const TableSales = () => {

  const [data, setData] = useState<Sale[]>([])

  const getData = async () => {

    try {

      const result = await api.get('/pedido/buscar-todos')

      const data = result.data

      const list: Sale[] = []
      data.map((sale: any) => {

        list.push({
          id: sale.id,
          amount: sale.valor,
          date: sale.data,
          client: sale.cliente
        })

      })

      setData(list)

    } catch (error) {
      setData([])
      console.log(error)
    }


  }

  const handleExportClick = async () => {
    try {
      
      const response = await api.get('/pedido/download', {
        responseType: 'blob',
      });

      if (response.status !== 200) {
        alert('Erro ao obter o PDF')
      }

      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      saveAs(pdfBlob, 'vendas.pdf');

    } catch (error) {
      alert('Erro ao obter o PDF')
    }
  };


  useEffect(() => {

    getData()

  }, [])

  return (
    <div style={{
      width: '80%',
      display: 'flex',
      justifyContent: 'center',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '10px',
      marginLeft: '4rem',
      marginRight: '4rem',
    }}>

      <h3>
        Tabela de vendas
      </h3>

      <Table>
        <TableHead style={{
          backgroundColor: '#ccc',
        }}>
          <TableRow>
            <TableCell>Nome do Cliente</TableCell>
            <TableCell>Data</TableCell>
            <TableCell>Valor Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((sale, index) => (
            <TableRow key={index}>
              <TableCell>{sale.client}</TableCell>
              <TableCell>
                {
                  new Date(sale.date).toLocaleDateString('pt-BR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  })
                }
              </TableCell>
              <TableCell>
                {
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(sale.amount / 100)
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button variant="contained" onClick={handleExportClick} style={{
        marginTop: '1rem',
      }}>
        Exportar
      </Button>


    </div>
  )
}
