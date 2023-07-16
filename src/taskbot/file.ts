import { readFile, writeFile } from "fs/promises";
import { createReadStream } from "fs";

import csv, { Options } from "csv-parser";

import { createObjectCsvWriter, createArrayCsvWriter } from "csv-writer";
import { ObjectCsvWriterParams, ArrayCsvWriterParams } from "csv-writer/src/lib/csv-writer-factory";


type FileContent = string | NodeJS.ArrayBufferView | Iterable<string | NodeJS.ArrayBufferView> | AsyncIterable<string | NodeJS.ArrayBufferView>;


export async function fileRead(path: string) {
	return await readFile(path, {
		encoding: "utf8",
	});
}

export async function fileWrite(path: string, content: FileContent) {
	await writeFile(path, content, {
		encoding: "utf8",
	});
}


export async function fileParseCSV(path: string, csvOptions: Options = {}): Promise<object[]> {
	return new Promise((resolve, reject) => {
		const data: object[] = [];

		createReadStream(path)
			.pipe(csv(csvOptions))
			.on("data", (row) => {
				data.push(row);
			})
			.on("end", () => {
				resolve(data);
			})
			.on("error", (error) => {
				reject(error);
			});
	});
}


export async function fileWriteObjectCSV(path: string, data: object[], options: ObjectCsvWriterParams) {
	createObjectCsvWriter({
		...options,
		path,
	}).writeRecords(data)
}

export async function fileWriteArrayCSV(path: string, data: any[][], options: ArrayCsvWriterParams) {
	createArrayCsvWriter({
		...options,
		path,
	}).writeRecords(data)
}
