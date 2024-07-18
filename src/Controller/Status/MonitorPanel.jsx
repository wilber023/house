import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function Monitor() {
    const [events, setEvents] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    console.error('Token no encontrado');
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/events', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setEvents(response.data);
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []); // Se ejecuta solo una vez al montar el componente

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="monitor">
            <h2>Eventos:</h2>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h3>Eventos Recientes</h3>
                        <ul>
                            {events.map((event, index) => (
                                <li key={index}>{event.event_type} - {new Date(event.created_at).toLocaleString()}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            <button onClick={openModal} className="open-modal-btn">Ver Eventos</button>
        </div>
    );
}
