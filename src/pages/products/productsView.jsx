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
import useProducts from '../../hooks/useProducts';
import '../../styles/productsView.css';

const ProductsView = () => {
  const { products, deleteProduct } = useProducts();

  const handleDelete = async (id) => {
    confirmDialog({
      message: '¿Estás seguro de eliminar este producto?',
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptClassName: 'p-button-danger',
      accept: async () => {
        try {
          await deleteProduct(id);
        } catch (err) {
          console.error('Error al eliminar el producto:', err);
        }
      }
    });
  };

  const exportPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(30, 0, 60);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'F');

    doc.setFontSize(22);
    doc.setTextColor(182, 82, 245);
    doc.text('Lista de Productos', 14, 30);

    doc.setFontSize(12);
    doc.setTextColor(216, 112, 255);
    const today = new Date().toLocaleDateString();
    doc.text(`Generado el: ${today}`, 14, 40);

    let yPosition = 50;
    const neonColors = [
      [182, 82, 245],  
      [216, 112, 255], 
      [138, 43, 226]   
    ];
    neonColors.forEach((color) => {
      doc.setFillColor(...color);
      doc.rect(0, yPosition, doc.internal.pageSize.width, 5, 'F');
      yPosition += 5;
    });

    autoTable(doc, {
      startY: yPosition + 10,
      head: [['Nombre', 'Precio']],
      body: products.map(product => [product.nombre, `$${product.precio}`]),
      headStyles: {
        fillColor: [182, 82, 245],
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        halign: 'center'
      },
      bodyStyles: {
        textColor: [216, 112, 255]
      },
      alternateRowStyles: {
        fillColor: [60, 10, 90]
      },
      styles: {
        fontSize: 11,
        cellPadding: 5,
        lineColor: [200, 100, 250],
        lineWidth: 0.5
      }
    });

    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(216, 112, 255);
      doc.text(`Página ${i} de ${pageCount}`, doc.internal.pageSize.width - 25, doc.internal.pageSize.height - 10);
    }

    doc.save('productos_neon_violeta.pdf');
  };

  const actionBodyTemplate = (product) => {
    return (
      <div className="product-action-buttons">
        <Link to={`/productos/editar/${product.id}`} className="btn-edit-product">
          <i className="pi pi-pencil"></i> Editar
        </Link>
        <Button
          icon="pi pi-trash"
          className="btn-delete-product"
          onClick={() => handleDelete(product.id)}
          label="Eliminar"
          size="small"
        />
      </div>
    );
  };
  

  return (
    
    <div className="products-view p-d-flex p-jc-center p-ai-center">
      <ConfirmDialog />
      <div className="products-container">
        <h2>Lista de Productos</h2>

        <div className="p-text-center p-mb-4">
          <Link to="/productos/nuevo" className="add-product-btn">
            <i className="pi pi-plus"></i> Agregar Producto
          </Link>
          <Button onClick={exportPDF} className="btn-export-pdf" label="Exportar PDF" />
        </div>

        {products.length === 0 ? (
          <Message severity="info" text="No hay productos disponibles." className="products-empty-text" />
        ) : (
          <DataTable
            value={products}
            className="modern-products-table"
            paginator
            rows={10}
            rowsPerPageOptions={[5, 10, 20]}
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
            emptyMessage="No se encontraron productos."
            stripedRows
            responsiveLayout="scroll"
          >
            <Column field="nombre" header="Nombre" sortable style={{ minWidth: '200px' }} />
            <Column field="precio" header="Precio" body={product => `$${product.precio}`} sortable style={{ minWidth: '120px' }} />
            <Column header="Acciones" body={actionBodyTemplate} style={{ minWidth: '200px' }} className="text-center" />
          </DataTable>
        )}
      </div>
    </div>
  );
};

export default ProductsView;
