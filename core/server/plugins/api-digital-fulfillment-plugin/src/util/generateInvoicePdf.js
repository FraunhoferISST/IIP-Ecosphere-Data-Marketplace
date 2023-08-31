const fs = require("fs");
const { Base64Encode } = require("base64-stream");
const PDFDocument = require("pdfkit-table");
const { formatDate } = require("./formatDate");

const formatIban = (iban = "") =>
  iban
    ? iban
        .trim()
        .match(/.{1,4}/g)
        .join(" ")
    : "";

const language = "de";
const translations = {
  en: {
    invoice: "Invoice",
    invoiceNumber: "Invoice number:",
    invoiceDate: "Invoice date:",
    positions: "Positions",
    nr: "Nr.",
    title: "Title",
    quantity: "Qnt.",
    price: "Price",
    subtotal: "Subtotal",
    total: "Total",
    tax: "Tax",
    itemsTotal: "Items total",
    fulfillment: "Fulfillment",
    body1: "Please transfer the above listed total amount of ",
    body2:
      "to the company's account. You can find the bank details on this invoice or on the company store page. Be sure to use your invoice number ",
    body3:
      " as the reference for payment. For further questions contact the data provider.",
    taxId: "Tax ID",
  },
  de: {
    invoice: "Rechnung",
    invoiceNumber: "Rechnungsnummer:",
    invoiceDate: "Rechnungsdatum:",
    positions: "Positionen",
    nr: "Nr.",
    title: "Titel",
    quantity: "Stk.",
    price: "Preis",
    subtotal: "Zwischensumme",
    total: "Gesamt",
    tax: "Steuer",
    itemsTotal: "Artikel gesamt",
    fulfillment: "Fulfillment",
    body1: "Bitte überweisen den oben aufgeführten Betrag in Höhe von ",
    body2:
      " auf das Konto des Unternehmens. Die Bankdaten finden Sie auf dieser Rechnung oder auf der Seite des Unternehmens-Shops. Verwenden Sie unbedingt ihre Rechnungsnummer ",
    body3:
      " als Verwendungszweck. Für weitere Fragen kontaktieren Sie den Datenanbieter.",
    taxId: "Steuernummer",
  },
};

const t = (key, lang = language) => translations[lang][key];

function generateHeader(doc, shop) {
  const shopAddress = shop.addressBook?.[0] ?? {};
  doc
    // .image("logo.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    .fontSize(15)
    .text(shop.name)
    .fontSize(10)
    .text(shopAddress.company, 200, 50, { align: "right" })
    .text(shopAddress.address1, 200, 65, { align: "right" })
    .text(`${shopAddress.postal} ${shopAddress.city}`, 200, 80, {
      align: "right",
    })
    .moveDown();
}

const generateBody = (doc, order) => {
  doc
    .fontSize(8)
    .font("Helvetica")
    .text(translations[language].body1, {
      continued: true,
    })
    .font("Helvetica-Bold")
    .text(`${order.summary.total.displayAmount}`, {
      continued: true,
    })
    .font("Helvetica")
    .text(
      // eslint-disable-next-line max-len
      translations[language].body2,
      {
        continued: true,
      }
    )
    .font("Helvetica-Bold")
    .text(`${order.referenceId}`, {
      continued: true,
    })
    .font("Helvetica")
    .text(translations[language].body3);
};

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}

function generateCustomerInformation(doc, order) {
  doc
    .fillColor("#444444")
    .fontSize(15)
    .text(translations[language].invoice, 50, 160);

  const { address } = order.payments[0];

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(8)
    .text(translations[language].invoiceNumber, 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(order.referenceId, 150, customerInformationTop)
    .font("Helvetica")
    .text(translations[language].invoiceDate, 50, customerInformationTop + 15)
    .text(formatDate(order.createdAt), 150, customerInformationTop + 15)

    .font("Helvetica-Bold")
    .text(address.fullName, 300, customerInformationTop)
    .font("Helvetica")
    .text(address.address1, 300, customerInformationTop + 15)
    .text(address.address1, 300, customerInformationTop + 15)
    .text(
      `${address.country}, ${address.region} - ${address.postal} ${address.city}`,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 252);
}

const generateSummaryTable = async (doc, order) => {
  const summaryData = [
    {
      title: translations[language].itemsTotal,
      value: order.summary.itemTotal.displayAmount,
    },
    {
      title: translations[language].fulfillment,
      value: order.summary.fulfillmentTotal.displayAmount,
    },
    {
      title: translations[language].tax,
      value: order.summary.taxTotal.displayAmount,
    },
    {
      title: translations[language].total,
      value: order.summary.total.displayAmount,
    },
    /* { title: "Paid", value: order.summary.paid }, */
  ];
  const headers = [
    { label: "tile", getWidth: (columnWidth) => 1.5 * columnWidth },
    { label: "value", getWidth: (columnWidth) => 0.5 * columnWidth },
  ];
  const tableWidth = 500;
  const columnWidth = tableWidth / headers.length;
  const tableData = {
    headers: headers.map((header) => ({
      label: header?.label ?? header,
      width: header?.getWidth?.(columnWidth) ?? columnWidth,
      padding: 10,
      align: "right",
      headerColor: "white",
    })),
    rows: summaryData.map((item) => [item.title, item.value]),
  };
  return doc.table(tableData, {
    width: 500,
    x: null,
    hideHeader: true,
    divider: {
      header: { disabled: true, width: 0, opacity: 0 },
      horizontal: { disabled: true, width: 0, opacity: 0 },
    },
    prepareRow: (row, indexColumn, indexRow, rectRow) => {
      if (indexRow === summaryData.length - 1) {
        doc.fontSize(10).font("Helvetica-Bold");
      } else {
        doc.fontSize(8).font("Helvetica");
      }
    },
  });
};

const generateInvoiceTable = async (doc, order) => {
  const headers = [
    {
      label: translations[language].nr,
      getWidth: (columnWidth) => 0.2 * columnWidth,
    },
    {
      label: translations[language].title,
      getWidth: (columnWidth) => 2 * columnWidth,
    },
    {
      label: translations[language].quantity,
      getWidth: (columnWidth) => 0.5 * columnWidth,
    },
    {
      label: translations[language].price,
      getWidth: (columnWidth) => 1 * columnWidth,
    },
    {
      label: translations[language].subtotal,
      getWidth: (columnWidth) => 1.4 * columnWidth,
    },
    {
      label: translations[language].tax,
      getWidth: (columnWidth) => 0.8 * columnWidth,
    },
  ];
  const tableWidth = 500;
  const columnWidth = tableWidth / headers.length;
  const tableData = {
    title: translations[language].positions,
    headers: headers.map((header) => ({
      label: header?.label ?? header,
      width: header?.getWidth?.(columnWidth) ?? columnWidth,
      padding: 10,
      headerColor: "white",
    })),
    rows: order.items.map((item, index) => [
      `${index + 1}`,
      item.title,
      `${item.quantity}`,
      item.price.displayAmount,
      item.subtotal.displayAmount,
      item.taxes?.length > 0
        ? `${item.taxCode} - ${item.taxes[0].taxRate * 100}%`
        : "-",
    ]),
  };
  return doc.table(tableData, {
    width: 500,
    y: 300,
    x: null,
    divider: {
      header: { disabled: false, width: 0.5, opacity: 1 },
      horizontal: { disabled: false, width: 0.5, opacity: 0.3 },
    },
  });
};

function generateFooter(doc, order) {
  const pages = doc.bufferedPageRange();
  for (let i = 0; i < pages.count; i++) {
    // doc.switchToPage(i + 1);

    // Footer: Add page number
    const oldBottomMargin = doc.page.margins.bottom;
    doc.page.margins.bottom = 0; // Dumb: Have to remove bottom margin in order to write into it
    doc
      .fontSize(5)
      .text(
        `BIC: ${order.shop.invoiceDetails?.bic}`,
        0,
        doc.page.height - oldBottomMargin,
        { align: "center" }
      )
      .text(`IBAN: ${formatIban(order.shop.invoiceDetails?.iban)}`, {
        align: "center",
      })
      .text(`${t("taxId")}: ${order.shop.invoiceDetails?.taxIdentityNumber}`, {
        align: "center",
      });
    /* doc.text(
      `Page: ${i + 1} of ${pages.count}`,
      20,
      doc.page.height - oldBottomMargin / 2, // Centered vertically in bottom margin
      { align: "center" }
    ); */
    doc.page.margins.bottom = oldBottomMargin; // ReProtect bottom margin
  }
}

const createInvoice = async (order, path = "invoice.pdf") =>
  new Promise(async (resolve) => {
    const doc = new PDFDocument({ size: "A4", margin: 50 });

    let base64dDoc = "";

    generateHeader(doc, order.shop);
    generateCustomerInformation(doc, order);
    await generateInvoiceTable(doc, order);
    doc.moveDown();
    await generateSummaryTable(doc, order);
    doc.moveDown();
    generateBody(doc, order);
    generateFooter(doc, order);

    doc.end();
    doc.pipe(fs.createWriteStream(path));
    const stream = doc.pipe(new Base64Encode());
    stream.on("data", (chunk) => {
      base64dDoc += chunk;
    });

    stream.on("end", () => {
      resolve(base64dDoc);
    });
  });

module.exports = {
  createInvoice,
};
