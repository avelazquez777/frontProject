import React from 'react';
import { Link } from 'react-router-dom';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Message } from 'primereact/message';
import { confirmDialog, ConfirmDialog } from 'primereact/confirmdialog';
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import useUsers from '../../hooks/useUsers';
import '../../styles/usersView.css';

const UsersView = () => {
  const { users, loading, error, deleteUser } = useUsers();

  const handleDelete = async (id) => {
    confirmDialog({
      message: '¿Estás seguro de eliminar este usuario?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          await deleteUser(id);
        } catch (err) {
          console.error('Error al eliminar usuario:', err);
        }
      }
    });
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(15, 23, 42);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    doc.setFontSize(22);
    doc.setTextColor(99, 102, 241);
    doc.text('Lista de Usuarios', 14, 30);

    doc.setFontSize(12);
    doc.setTextColor(139, 92, 246);
    const today = new Date().toLocaleDateString();
    doc.text(`Generado el: ${today}`, 14, 40);

    let yPosition = 50;
    const neonColors = [
      [99, 102, 241],  
      [139, 92, 246],  
      [6, 182, 212]   
    ];
    neonColors.forEach((color) => {
      doc.setFillColor(...color);
      doc.rect(0, yPosition, doc.internal.pageSize.width, 5, 'F');
      yPosition += 5;
    });

    autoTable(doc, {
      startY: yPosition + 10,
      head: [['Nombre', 'Email', 'Edad']],
      body: users.map(user => [user.nombre, user.email, user.edad]),
      headStyles: {
        fillColor: [99, 102, 241],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: [182, 82, 245],
      },
      alternateRowStyles: {
        fillColor: [30, 41, 59]
      },
      margin: { top: yPosition + 10 },
      styles: {
        fontSize: 11,
        cellPadding: 5,
        lineColor: [200, 200, 200],
        lineWidth: 0.5
      }
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(139, 92, 246);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10);
    }

    doc.save('usuarios_neon.pdf');
  };

  const actionBodyTemplate = (user) => {
    return (
      <div className="action-buttons">
        <Link to={`/edit/${user.id}`} className="btn-edit">
          <i className="pi pi-pencil"></i> Editar
        </Link>
        <Button
          icon="pi pi-trash"
          className="btn-delete"
          onClick={() => handleDelete(user.id)}
          label="Eliminar"
          size="small"
        />
      </div>
    );
  };

  if (loading) {
    return (
      <div className="users-view p-d-flex p-jc-center p-ai-center">
        <div className="p-d-flex p-ai-center p-flex-column">
          <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="4" />
          <p className="loading-text p-mt-3">Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="users-view p-d-flex p-jc-center p-ai-center">
        <Message severity="error" text={`Error: ${error}`} className="error-text" />
      </div>
    );
  }

  return (
    <div className="users-view p-d-flex p-jc-center p-ai-center">
      <ConfirmDialog />
      <div className="users-container">
        <h2>Lista de Usuarios</h2>

        <div className="p-text-center p-mb-4">
          <Link to="/usuarios/nuevo" className="add-user-btn">
            <i className="pi pi-plus"></i> Agregar Usuario
          </Link>
          <Button onClick={exportPDF} className="btn-export-pdf" label="Exportar PDF" />
        </div>

        {users.length === 0 ? (
          <Message severity="info" text="No hay usuarios disponibles." className="empty-text" />
        ) : (
          <DataTable
            value={users}
            className="modern-table"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} usuarios"
            emptyMessage="No se encontraron usuarios."
            stripedRows
            responsiveLayout="scroll"
          >
            <Column field="nombre" header="Nombre" sortable style={{ minWidth: '200px' }} />
            <Column field="email" header="Email" sortable style={{ minWidth: '200px' }} />
            <Column field="edad" header="Edad" sortable style={{ minWidth: '100px', textAlign: 'center' }} />
            <Column header="Acciones" body={actionBodyTemplate} style={{ minWidth: '200px' }} className="text-center" />
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default UsersView;
