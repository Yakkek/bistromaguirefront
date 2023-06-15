import { Alert, Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { Header } from '../components/Header';
import { useCart } from '../store/cart';
import { api } from '../service/api';
import { useAuth } from '../store/auth';
import { useState } from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';

export const Cart = () => {
  const { user } = useAuth();
  const { products, removeProduct, removeAllProducts } = useCart();

  const [purchaseFinished, setPurchaseFinished] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('');

  const calculateTotal = () => {
    let total = 0;
    for (const item of products) {
      total += item.price * item.quantityCart;
    }
    return total;
  };

  const handlePaymentSelection = (paymentMethod: string) => {
    setSelectedPayment(paymentMethod);
  };

  const handleFinishPurchase = async () => {
    if (selectedPayment === '') {
      alert('Selecione uma forma de pagamento!');
      return;
    }

    const items = products.map((item) => ({
      itemId: item.id,
      quantidade: item.quantityCart
    }));

    if (!user?.id) {
      alert('Você precisa estar logado para finalizar a compra!');
      return;
    }

    if (items.length === 0) {
      alert('Você precisa ter itens no carrinho para finalizar a compra!');
      return;
    }

    const res = await api.post('pedido/criar', {
      clienteId: user?.id,
      itens: items,
      formaPagamento: selectedPayment
    });

    if (res.status === 200) {
      removeAllProducts();
      setPurchaseFinished(true);
    } else {
      alert('Ocorreu um erro ao finalizar a compra!');
    }
  };

  return (
    <div>
      <Header />

      <div style={{ padding: '2rem' }}>
        <Grid container spacing={2}>
          {products.map((item) => (
            <Grid item key={item.id} xs={12}>
              <Card sx={{ border: '1px solid #ccc' }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {item.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Preço: R${(item.price / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Quantidade: {item.quantityCart}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => removeProduct(item.id)}
                  >
                    Remover do Carrinho
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem' }}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Forma de Pagamento</FormLabel>
            <RadioGroup value={selectedPayment} onChange={(e) => handlePaymentSelection(e.target.value)}>
              <FormControlLabel value="creditCard" control={<Radio />} label="Cartão de Crédito" />
              <FormControlLabel value="debitCard" control={<Radio />} label="Cartão de Débito" />
              <FormControlLabel value="bankTransfer" control={<Radio />} label="PIX" />
              <FormControlLabel value="din" control={<Radio />} label="Dinheiro" />
              
            </RadioGroup>
          </FormControl>
          <Button variant="contained" color="primary" size="large" onClick={handleFinishPurchase}>
            Finalizar Compra
          </Button>
          {purchaseFinished && <Alert severity="success">Compra finalizada com sucesso!</Alert>}
          {!purchaseFinished && (
            <Typography variant="h6" component="div">
              Total: R${(calculateTotal() / 100).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </Typography>
          )}
        </div>
      </div>
    </div>
  );
};
