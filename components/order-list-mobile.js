import React from 'react'
import { Accordion, Card } from 'react-bootstrap'
import OrderDetails from './order-details';

export default function OrderListMobile() {
    const array = [1, 2, 3, 4, 5];
    return (
        <div className="mobile_view">
            <h3>Мои заказы</h3>
            <Accordion defaultActiveKey="0">
                {array.map(i => (
                    <div key={i}>
                        <Accordion.Toggle eventKey={i}>
                            <div className="order_card">
                                <div className="card_header">
                                    <span>Заказ #{i}</span>
                                </div>
                                <div className="card_body">
                                    <div className="card_meta">
                                        <span>Дата:</span>
                                        <span>июнь 11, 2020 - 17:20</span>
                                    </div>
                                    <div className="card_meta">
                                        <span>Статус:</span>
                                        <span>Доставлен</span>
                                    </div>
                                    <div className="card_meta">
                                        <span>Всего:</span>
                                        <span>7 918 000 сум</span>
                                    </div>
                                </div>
                            </div>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey={i}>
                            <OrderDetails />
                        </Accordion.Collapse>
                    </div>
                ))}
            </Accordion>
        </div>
    )
}