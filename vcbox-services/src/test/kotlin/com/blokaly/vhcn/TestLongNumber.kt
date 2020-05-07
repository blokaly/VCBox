package com.blokaly.vhcn

import java.math.BigInteger
import java.util.*
import java.util.zip.Deflater
import javax.xml.bind.DatatypeConverter

object TestLongNumber {

    @JvmStatic
    fun main(args: Array<String>) {
        val input = "56061392604875494853396509120600186336209685975475127532100005315884888007247452629384306979821501890171355566746454746549152689054766731653489961237601329539186086361274081139117120780011953682918004124200659327173273016846453299913696403853335352888216749570603208910772561481606292819833153387848946214104491377731491724455061780325421634175624637001539676772386065581692340522933139979405611355375630082104163997772510000438671381879826444087936830586862512704596477141621418517574931764229676524421337500095945582852409811902190126445658321330066374559845181503072728529667463681250552178687568431210158263156780103595643398386882338115000988021330306974082450903500218357688875577789009"
        println("len: ${input.length} $input")

        val bitInt = BigInteger(input)

        val str1 = bitInt.toString(Character.MAX_RADIX)
        println("len: ${str1.length} $str1")

        val encoded = String(Base64.getEncoder().encode(bitInt.toByteArray()))
        println("len: ${encoded.length} $encoded")

        val compressed = compressToStringBase64(bitInt.toByteArray())
        println("len: ${compressed.length} $compressed")
    }

    private fun compressToStringBase64(data:ByteArray):String {
        val output = ByteArray(1024)
        val compresser = Deflater(Deflater.BEST_COMPRESSION)
        compresser.setInput(data)
        compresser.finish()
        val compressedDataLength = compresser.deflate(output)
        compresser.end()
        return DatatypeConverter.printBase64Binary(output.copyOf(compressedDataLength))
    }
}