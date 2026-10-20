import type { OpenOrder } from "@/schema/open-order";
import { deleteCookie } from "cookies-next";
import dayjs from "dayjs";
import ExcelJs from "exceljs";
import { saveAs } from "file-saver";

export function flattenObject(ob: any) {
  let result: any = {};

  for (const i in ob) {
    if (typeof ob[i] === "object" && !Array.isArray(ob[i])) {
      const temp = flattenObject(ob[i]);
      for (const j in temp) {
        result[j] = temp[j];
      }
    } else {
      result[i] = ob[i];
    }
  }
  return result;
}

export function removeSpecialChar(arr: any) {
  if (arr === null) return [];

  const mappedArray = arr.map((e: any) => {
    let tempObj = { ...e };

    for (let i in e) {
      if (typeof e[i] === "string") {
        tempObj[i] = e[i].replaceAll(/"|,/g, " ");
      }
    }

    return tempObj;
  });

  return mappedArray;
}

export function capitalizeFirstLetter(string: string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function shortenString(input = "", prefixLength = 8, suffixLength = 4): string {
  if (input.length <= prefixLength + suffixLength + 3) return input;
  const prefix = input.slice(0, prefixLength);
  const suffix = input.slice(-suffixLength);
  return `${prefix}...${suffix}`;
}

export function validateEmail(value: string) {
  return String(value)
    ?.toLowerCase()
    ?.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

export function isDataSelected(field: any, selectedItems: any, itemKey: any) {
  return !selectedItems.length || selectedItems.includes(field[itemKey]);
}

export function objectSearch(field: any, selectedItems: any, itemKeys: any) {
  return (
    !selectedItems.length ||
    itemKeys.some((itemKey: any) => {
      return field[itemKey]?.toLowerCase().includes(selectedItems?.toLowerCase());
    })
  );
}

export function base64ToPDF(pdf: string) {
  const linkSource = `data:application/pdf;base64,${pdf}`;
  const downloadLink = document.createElement("a");
  const fileName = "postage.pdf";
  downloadLink.href = linkSource;
  downloadLink.download = fileName;
  downloadLink.click();
}

export function processAddress2(address: string) {
  if (typeof address !== "string") return " ";

  const addressArr = address.split(" ");

  if (addressArr[0].startsWith("eCP:")) addressArr.shift();

  if (addressArr[addressArr.length - 1].startsWith("ebay")) addressArr.pop();

  return addressArr.join(" ");
}

export function mergeDuplicateOrders(arr: OpenOrder[]) {
  const map = new Map<string, OpenOrder>();

  for (const row of arr) {
    const channel = row?.channel?.channel_type;
    const buyer = row?.shipping_address?.buyer_name?.toLowerCase();

    const isRestricted =
      ["otto", "amazon"].includes(channel) || buyer === "pitney bowes warehouse";

    const baseKey = [
      row?.shipping_address?.buyer_name?.toLowerCase(),
      row?.shipping_address?.address1?.toLowerCase(),
      processAddress2(row?.shipping_address?.address2),
    ].join("|");

    const key = isRestricted ? `${baseKey}|${row.channel_order_id}` : baseKey;

    if (!map.has(key)) {
      map.set(key, {
        ...row,
        items: row.items.map((item) => ({
          ...item,
          channel_order_id: row.channel_order_id,
        })),
        merge_order_ids: [],
      });
      continue;
    }

    // merge only happens for NON-restricted
    const existing = map.get(key)!;

    const newItems = row.items.map((item) => ({
      ...item,
      channel_order_id: row.channel_order_id,
    }));

    existing.items.push(...newItems);

    if (
      row.channel_order_id !== existing.channel_order_id &&
      !existing.merge_order_ids.includes(row.channel_order_id)
    ) {
      existing.merge_order_ids.push(row.channel_order_id);
    }
  }

  return Array.from(map.values());
}

export function mergeCell(arr: OpenOrder[]) {
  return arr
    .map((e) => ({ ...e, merge_order_ids: [] }))
    .reduce((acc: OpenOrder[], row) => {
      const existingSel = acc.find(
        (e) =>
          e?.shipping_address?.buyer_name === row?.shipping_address?.buyer_name &&
          e?.shipping_address?.address1 === row?.shipping_address?.address1 &&
          processAddress2(e?.shipping_address?.address2) ===
            processAddress2(row?.shipping_address?.address2) &&
          !["otto", "amazon"].includes(e?.channel?.channel_type) &&
          e?.shipping_address?.buyer_name?.toLowerCase() !== "pitney bowes warehouse"
      );

      if (!existingSel) {
        return [...acc, { ...row }];
      }

      existingSel.items = [...existingSel.items, ...row.items];

      existingSel.merge_order_ids.push(row.channel_order_id);

      if (!existingSel.merge_order_ids?.includes(existingSel.channel_order_id)) {
        existingSel.merge_order_ids?.push(existingSel.channel_order_id);
      }

      return acc;
    }, []);
}

export function toHoursAndMinutes(totalMinutes: number) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours === 0
    ? `${minutes > 0 ? ` ${minutes} mins` : ""}`
    : `${hours} hrs ${minutes > 0 ? `${minutes} mins` : ""}`;
}

export function getTime(date: Date | string | null) {
  if (date === null || date === "" || date === undefined) return null;

  const d = new Date(date);

  const hr = d.getHours() <= 9 ? `0${d.getHours()}` : `${d.getHours()}`;
  const min = d.getMinutes() <= 9 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;

  return `${hr}:${min}`;
}

export function getFullDateTime(time: string) {
  if (time === "" || time === null || time === undefined) return null;
  const date = new Date();
  const [hours, minutes] = time.split(":");
  date.setHours(+hours);
  date.setMinutes(+minutes);
  return date.toISOString();
}

export function getBase64(file: Blob) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      resolve(reader.result);
    };

    reader.onerror = function (error) {
      reject(error);
    };
  });
}

export function generateAvatar(seed: string) {
  return `https://api.dicebear.com/7.x/initials/svg?seed=${seed}&fontSize=35&fontWeight=600`;
}

export function getInitials(string: string) {
  if (!string) return "";

  let names = string.split(" "),
    initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }

  return initials;
}

export function kebabize(str: string) {
  return str.replace(
    /[A-Z]+(?![a-z])|[A-Z]/g,
    ($, ofs) => (ofs ? "-" : "") + $.toLowerCase()
  );
}

// eslint-disable-next-line no-unused-vars
export function groupBy<T extends object>(arr: T[] = [], keyFunction: (d: T) => any) {
  let groups = {} as any;
  arr.forEach((el) => {
    let key = keyFunction(el);
    if (key in groups === false) {
      groups[key] = [];
    }
    groups[key].push(el);
  });
  return Object.keys(groups).map((key) => {
    return {
      key: key,
      values: groups[key] as T[],
    };
  });
}

export function truncateName(str: string, length: number) {
  if (str?.length > length) {
    return (str = str?.substring(0, length) + "...");
  }
  return str;
}

export function logout() {
  localStorage.clear();
  deleteCookie("accessToken");
  deleteCookie("dashboardAlert");
  window.location.href = "/login";
}

export function leftTime(receiveDate: string) {
  const timeGet = dayjs(receiveDate).add(1, "day");
  const today = dayjs(new Date());

  let timeLeft = timeGet.diff(today, "hours");
  const negativeHours = Math.abs(timeLeft);

  if (timeLeft < 0) {
    if (negativeHours > 24) {
      const days = parseInt(`${negativeHours / 24}`);
      const hours = parseInt(`${negativeHours % 24}`);

      if (hours === 0) {
        return `${days}d overdue`;
      }
      return `${days}d ${hours}h overdue`;
    }
    return `${Math.abs(timeLeft)}h overdue`;
  }

  return `${timeLeft}h left`;
}

export function findDuplicate(arr: any[], val: string) {
  return arr.filter((e) => e.channel_order_id === val).length > 1;
}

export function hasDuplicate(values: any[]) {
  const uniqueValues = new Set(values.map((v) => v.channel_order_id));
  return uniqueValues.size < values.length;
}

// export function removeDuplicate<T extends Record<string, any>>(
//   arr: T[],
//   val: keyof T
// ): T[] {
//   return arr.filter((value, index, array) => {
//     const currentVal = value[val];

//     // Do not filter out if the value is null, undefined, or empty string
//     if (currentVal === null || currentVal === undefined || currentVal === "") {
//       return true;
//     }

//     return index === array.findIndex((item) => item[val] === currentVal);
//   });
// }

export function removeDuplicate<T extends Record<string, any>>(
  arr: T[],
  key: keyof T
): T[] {
  const map = new Map<string, T>();

  for (const item of arr) {
    const keyValRaw = item[key];

    const keyVal =
      typeof keyValRaw === "string" || typeof keyValRaw === "number"
        ? String(keyValRaw)
        : crypto.randomUUID(); // fallback to unique id if key is invalid

    const existing = map.get(keyVal);

    // Safe extraction of buyer name
    const itemBuyerName =
      "buyerInfo" in item && item.buyerInfo && typeof item.buyerInfo.name === "string"
        ? item.buyerInfo.name
        : "";

    // Safe check for orderItems array
    const itemOrderItemsLength =
      "orderItems" in item && Array.isArray(item.orderItems) ? item.orderItems.length : 0;

    const existingBuyerName =
      existing &&
      "buyerInfo" in existing &&
      existing.buyerInfo &&
      typeof existing.buyerInfo.name === "string"
        ? existing.buyerInfo.name
        : "";

    const existingOrderItemsLength =
      existing && "orderItems" in existing && Array.isArray(existing.orderItems)
        ? existing.orderItems.length
        : 0;

    const itemPriorityScore =
      (itemBuyerName ? 1 : 0) + (itemOrderItemsLength > 0 ? 1 : 0);
    const existingPriorityScore =
      (existingBuyerName ? 1 : 0) + (existingOrderItemsLength > 0 ? 1 : 0);

    if (!existing || itemPriorityScore > existingPriorityScore) {
      map.set(keyVal, item);
    }
  }

  return Array.from(map.values());
}

export function getDuplicate<T extends Record<string, any>>(arr: T[], val: keyof T) {
  return arr.filter(
    (value, index, array) => index === array.findIndex((item) => item[val] === value[val])
  );
}

export function removeDuplicateByField<T>(arr: T[], fieldName: keyof T | null) {
  if (!fieldName) return arr;

  return arr.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t[fieldName] === value[fieldName])
  );
}

export function getRandomNumber(range: number): number {
  return Math.floor(Math.random() * range) + 1;
}

// Function to get the value of a nested object property
export function _set(obj: any, path: string | string[], value: any): any {
  if (typeof path === "string") {
    path = path.split(".");
  }

  path.reduce((acc, key, index) => {
    if (index === path.length - 1) {
      acc[key] = value;
    } else {
      if (acc[key] === undefined) {
        acc[key] = {};
      }
    }
    return acc[key];
  }, obj);

  return obj;
}

// Function to convert the array to a CSV file
export function downloadCsv(
  data: { [key: string]: any }[],
  fileName: string = "data.csv"
) {
  if (!data || data.length === 0) {
    // eslint-disable-next-line no-console
    console.error("No data available to export.");
    return;
  }

  // Extract headers from the keys of the first object
  const headers = Object.keys(data[0]);

  // Generate CSV content
  const csvContent = [
    headers.join(","), // Header row
    ...data.map((row) =>
      headers
        .map((header) => {
          const value = row[header] ?? ""; // Handle undefined or null values
          // Escape quotes and commas for CSV
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\n");

  // Create a Blob with the CSV content
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

  // Create a link element for downloading the file
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;

  // Trigger the download
  link.click();

  // Cleanup the URL object
  URL.revokeObjectURL(link.href);
}

// Function to convert the array to an Excel file
export async function downloadXlsx(data: any[], fileName: string = "data.xlsx") {
  const workbook = new ExcelJs.Workbook();
  const worksheet = workbook.addWorksheet("Sheet1");

  // Add header row
  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);

  // Add data rows
  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  // Generate buffer and download
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/octet-stream" });
  saveAs(blob, fileName);
}

// Function to convert a string to Base64
export function stringToBase64(input: string) {
  return Buffer.from(input).toString("base64");
}

// Function to convert Base64 back to a string
export function base64ToString(base64: string): string {
  return Buffer.from(base64, "base64").toString("utf-8");
}

export function removeKeyFromObject(
  obj: {
    [key: string]: any;
  },
  keyToRemove: string
) {
  const newObj = { ...obj };

  if (keyToRemove in newObj) {
    delete newObj[keyToRemove];
  }

  return newObj as any;
}

// Strips empty and "ALL" filter values so they are not sent as query params.
// Accepts either a flat object or a [filters, pagination] tuple.
export function toQueryParams<T extends Record<string, unknown>>(
  input: T | { filters: T; pagination: Record<string, unknown> }
): Record<string, unknown> {
  const source =
    "filters" in input && "pagination" in input
      ? { ...(input.filters as T), ...(input.pagination as Record<string, unknown>) }
      : (input as T);

  return Object.fromEntries(
    Object.entries(source).filter(([, value]) => {
      if (value === undefined || value === null || value === "") return false;
      if (typeof value === "string" && value.toUpperCase() === "ALL") return false;
      return true;
    })
  );
}

export function getDuplicatePostageIdentifierCount(data: any[]) {
  // Create a map to store the count of each postageIdentifier
  const identifierCount: { [key: string]: number } = {};

  // Count occurrences of each postageIdentifier
  data.forEach((item) => {
    const identifier = item.postageIdentifier;
    identifierCount[identifier] = (identifierCount[identifier] || 0) + 1;
  });

  // Count identifiers that appear more than once
  let duplicateCount = 0;
  for (const count of Object.values(identifierCount)) {
    if (count > 1) {
      duplicateCount += count - 1; // Count additional occurrences as duplicates
    }
  }

  return duplicateCount;
}
