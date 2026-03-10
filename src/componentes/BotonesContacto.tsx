import { Contacto } from "../tipos/negocios.tipos";
import { Phone, MessageCircle, MessageSquare, Globe } from "lucide-react";

interface Props {
  contacto: Contacto;
}

export default function BotonesContacto({ contacto }: Props) {
  return (
    <div className="flex flex-wrap gap-4 mt-4">
      {contacto.telefono && (
        <a
          href={`tel:${contacto.telefono}`}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Phone size={20} />
          <span>Llamar</span>
        </a>
      )}

      {contacto.whatsapp && (
        <a
          href={`https://wa.me/52${contacto.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <MessageCircle size={20} />
          <span>WhatsApp</span>
        </a>
      )}

      {contacto.facebook && (
        <a
          href={contacto.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors"
        >
          <MessageSquare size={20} />
          <span>Messenger</span>
        </a>
      )}

      {contacto.instagram && (
        <a
          href={contacto.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors"
        >
          <Globe size={20} />
          <span>Instagram</span>
        </a>
      )}
    </div>
  );
}