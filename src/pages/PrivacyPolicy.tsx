const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto max-w-3xl px-4 py-20">
        <h1 className="text-3xl font-bold mb-2">Política de Privacidad</h1>
        <p className="text-muted-foreground mb-8">Fecha de vigencia: 8 de abril de 2026</p>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground [&_h2]:text-foreground [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:mt-8 [&_h2]:mb-3 [&_ul]:list-disc [&_ul]:pl-6 [&_strong]:text-foreground">
          <p>
            Holding Inmobiliario La Ceiba Group S.A.S ("nosotros", "nuestro" o "nos") opera el sitio web{" "}
            <a href="https://laceiba.group/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              https://laceiba.group/
            </a>{" "}
            y servicios relacionados.
          </p>
          <p>
            Esta Política de Privacidad explica cómo recopilamos, usamos, divulgamos y protegemos su información cuando interactúa con nuestra aplicación y servicios, incluyendo integraciones con Facebook Lead Ads.
          </p>

          <hr className="border-border" />

          <h2>1. Información que Recopilamos</h2>
          <p>Podemos recopilar la siguiente información personal de los usuarios a través de Facebook Lead Ads y servicios relacionados:</p>
          <ul>
            <li>Nombre completo</li>
            <li>Dirección de correo electrónico</li>
            <li>Número de teléfono</li>
            <li>Cualquier información adicional proporcionada voluntariamente a través de formularios de captación</li>
          </ul>

          <hr className="border-border" />

          <h2>2. Cómo Usamos su Información</h2>
          <p>Utilizamos la información recopilada para los siguientes propósitos:</p>
          <ul>
            <li>Almacenar y gestionar leads en nuestra base de datos interna</li>
            <li>Contactar a los usuarios sobre servicios y oportunidades inmobiliarias</li>
            <li>Enviar comunicaciones a través de plataformas de mensajería como WhatsApp</li>
            <li>Gestionar relaciones con clientes a través de sistemas CRM</li>
            <li>Realizar análisis y mejorar nuestros servicios</li>
          </ul>

          <hr className="border-border" />

          <h2>3. Compartición de Información</h2>
          <p>Podemos compartir información del usuario con terceros solo cuando sea necesario para proporcionar nuestros servicios, incluyendo:</p>
          <ul>
            <li>Plataformas CRM para la gestión de clientes</li>
            <li>Servicios de mensajería (como WhatsApp) para comunicación</li>
            <li>Herramientas de análisis para mejorar el rendimiento y la experiencia del usuario</li>
          </ul>
          <p><strong>No vendemos ni alquilamos datos personales a terceros.</strong></p>

          <hr className="border-border" />

          <h2>4. Almacenamiento y Retención de Datos</h2>
          <p>Los datos del usuario se almacenan de forma segura en nuestras bases de datos de servidor.</p>
          <p>Retenemos la información personal solo durante el tiempo necesario para cumplir con los propósitos descritos en esta política o según lo requiera la ley.</p>

          <hr className="border-border" />

          <h2>5. Seguridad de los Datos</h2>
          <p>Implementamos medidas técnicas y organizativas apropiadas para proteger su información, incluyendo:</p>
          <ul>
            <li>Comunicación segura mediante HTTPS</li>
            <li>Almacenamiento de datos cifrado</li>
            <li>Mecanismos de control de acceso para restringir el acceso no autorizado</li>
          </ul>

          <hr className="border-border" />

          <h2>6. Derechos del Usuario y Eliminación de Datos</h2>
          <p>Los usuarios tienen derecho a solicitar el acceso, corrección o eliminación de sus datos personales.</p>
          <p>Para solicitar la eliminación de datos, contáctenos en:</p>
          <p>
            📧{" "}
            <a href="mailto:info@laceiba.group" className="text-primary hover:underline">
              info@laceiba.group
            </a>
          </p>
          <p>Procesaremos dichas solicitudes de acuerdo con las leyes y regulaciones aplicables.</p>

          <hr className="border-border" />

          <h2>7. Plataformas de Terceros</h2>
          <p>Nuestra aplicación puede integrarse con plataformas de terceros como Facebook y WhatsApp. Estas plataformas tienen sus propias políticas de privacidad, y alentamos a los usuarios a revisarlas.</p>

          <hr className="border-border" />

          <h2>8. Cambios a esta Política</h2>
          <p>Podemos actualizar esta Política de Privacidad de vez en cuando. Cualquier cambio se publicará en esta página con una fecha de vigencia actualizada.</p>

          <hr className="border-border" />

          <h2>9. Contáctenos</h2>
          <p>Si tiene alguna pregunta sobre esta Política de Privacidad, puede contactarnos en:</p>
          <p>
            <strong>Holding Inmobiliario La Ceiba Group S.A.S</strong><br />
            🌐{" "}
            <a href="https://laceiba.group/" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
              https://laceiba.group/
            </a><br />
            📧{" "}
            <a href="mailto:info@laceiba.group" className="text-primary hover:underline">
              info@laceiba.group
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
