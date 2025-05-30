import React from 'react'
import { InstagramMessageCard } from './InstagramMessageCard'

const messages = [
  {
    id: 1,
    to: "María",
    message:
      "Siempre he admirado tu valentía. La forma en que enfrentas los desafíos me inspira a ser mejor persona. Nunca te lo dije porque temía que pensaras que buscaba algo más.",
    timeAgo: "HOY",
  },
  {
    id: 2,
    to: "Juan",
    message:
      "Aquella noche bajo las estrellas, cuando hablábamos de nuestros sueños, quise decirte que eras parte de los míos. El miedo a perder nuestra amistad me hizo callar.",
    timeAgo: "AYER",
  },
  {
    id: 3,
    to: "Carlos",
    message:
      "Cuando te fuiste de la empresa, quise decirte cuánto aprendí de ti. Fuiste el mejor mentor que pude tener, pero mi orgullo me impidió expresarlo.",
    timeAgo: "LUNES",
  },
  {
    id: 4,
    to: "Ana",
    message:
      "Cada vez que me ayudaste sin pedir nada a cambio, me sentí en deuda. Tu generosidad me enseñó lo que significa la verdadera amistad. Nunca te agradecí como merecías.",
    timeAgo: "SEMANA PASADA",
  },
  {
    id: 5,
    to: "Pedro",
    message:
      "Aquella idea que presentaste y todos criticaron, yo la encontré brillante. No te defendí por miedo al rechazo del grupo, y es algo de lo que me arrepiento cada día.",
    timeAgo: "2 SEMANAS",
  },
  {
    id: 6,
    to: "Laura",
    message:
      "Cuando pasabas por ese momento difícil, quise abrazarte y decirte que no estabas sola. Mi timidez me paralizó, y ahora que estás mejor, siento que perdí la oportunidad.",
    timeAgo: "3 SEMANAS",
  },
]

export function MessageBoard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {messages.map((message) => (
        <div key={message.id} className="w-full">
          <InstagramMessageCard 
            to={message.to} 
            message={message.message} 
            timeAgo={message.timeAgo} 
          />
        </div>
      ))}
    </div>
  )
}