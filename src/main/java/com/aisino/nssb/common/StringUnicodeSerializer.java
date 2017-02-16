package com.aisino.nssb.common;

import com.fasterxml.jackson.core.JsonGenerationException;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.io.CharTypes;
import com.fasterxml.jackson.core.json.JsonWriteContext;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;

import java.io.IOException;


public class StringUnicodeSerializer extends JsonSerializer<String> {

    private final char[] HEX_CHARS="0123456789ABCDEF".toCharArray();
    private final int[] ESCAPE_CODES= CharTypes.get7BitOutputEscapes();

    private void writeUnicodeEscape(JsonGenerator jsonGenerator,char c) throws IOException{
          jsonGenerator.writeRaw("\\");
         jsonGenerator.writeRaw("u");
        jsonGenerator.writeRaw(HEX_CHARS[(c >> 12) & 0xF]);
        jsonGenerator.writeRaw(HEX_CHARS[(c >> 8) & 0xF]);
        jsonGenerator.writeRaw(HEX_CHARS[(c >> 4) & 0xF]);
        jsonGenerator.writeRaw(HEX_CHARS[c & 0xF]);
    }

    private void writeShortEscape(JsonGenerator jsonGenerator,char c) throws IOException{
        jsonGenerator.writeRaw("\\");
        jsonGenerator.writeRaw(c);
    }

    @Override
    public void serialize(String s, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException, JsonProcessingException {
         int status=((JsonWriteContext)jsonGenerator.getOutputContext()).writeValue();
        switch (status){
        case JsonWriteContext.STATUS_OK_AFTER_COLON:
           jsonGenerator.writeRaw(":");
           break;
        case JsonWriteContext.STATUS_OK_AFTER_COMMA:
           jsonGenerator.writeRaw(",");
           break;
        case JsonWriteContext.STATUS_EXPECT_NAME:
           throw new JsonGenerationException("Can not write string value here");
        }
        jsonGenerator.writeRaw('"');//写入JSON中字符串的开头引号
        for (char c : s.toCharArray()) {
            if (c >= 0x80){
                writeUnicodeEscape(jsonGenerator, c); // 为所有非ASCII字符生成转义的unicode字符
            }else {
                // 为ASCII字符中前128个字符使用转义的unicode字符
                int code = (c < ESCAPE_CODES.length ? ESCAPE_CODES[c] : 0);
                if (code == 0){
                    jsonGenerator.writeRaw(c); // 此处不用转义
                }else if (code < 0){
                    writeUnicodeEscape(jsonGenerator, (char) (-code - 1)); // 通用转义字符
                }else {
                    writeShortEscape(jsonGenerator, (char) code); // 短转义字符 (\n \t ...)
                }
            }
        }
        jsonGenerator.writeRaw('"');//写入JSON中字符串的结束引号
    }
}
