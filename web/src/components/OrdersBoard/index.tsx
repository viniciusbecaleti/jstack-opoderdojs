import { useState } from 'react';
import { toast } from 'react-toastify';
import { Order } from '../../types/Order';
import { api } from '../../utils/api';
import { OrderModal } from '../OrderModal';

import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string
  title: string
  orders: Order[]
  onCancelOrder: (orderId: string) => void
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void
}

export function OrdersBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    if (!selectedOrder) return;

    setIsLoading(true);

    const newStatus = selectedOrder.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await api.patch(`/orders/${selectedOrder._id}`, {
      status: newStatus
    });

    toast.success(`O pedido da mesa ${selectedOrder.table} teve o status alterado!`);
    onChangeOrderStatus(selectedOrder._id, newStatus);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) return;

    setIsLoading(true);
    await api.delete(`/orders/${selectedOrder._id}`);

    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
    onCancelOrder(selectedOrder._id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        onCloseModal={handleCloseModal}
        order={selectedOrder}
        onCancelModal={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
        isLoading={isLoading}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map(order => (
            <button type="button" onClick={() => handleOpenModal(order)} key={order._id}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
