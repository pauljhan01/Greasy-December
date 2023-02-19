def shiftLeft(input_text):
    # print("Shifting to the left!")
    shifted_text = ""

    for char in input_text:
        ascii_code = (ord(char) - 3)

        # Avoid ' ' and '!'
        # if asciiCode > 126: asciiCode = (asciiCode + 34)
        if ascii_code < 34: ascii_code = (ascii_code + 93)

        shifted_text += chr(ascii_code)
        # print(asciiCode, chr(asciiCode))

    return shifted_text


def decrypt(input_text):
    # reverse inputText
    input_text = input_text[::-1]

    # Shift text left
    shifted_text = shiftLeft(input_text)

    return shifted_text
