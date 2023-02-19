def shiftRight(text):

    shifted_text = ""

    for char in text:
        ascii_code = (ord(char) + 3)
        # Avoid ' ' and '!'
        if ascii_code > 126: ascii_code = (ascii_code + 33) % 126;
        if ascii_code < 34: ascii_code = (ascii_code + 34)
        shifted_text += chr(ascii_code)
        # print(ascii_code, chr(ascii_code))
    return shifted_text


# Encrypt text by reversing it and shifting it N characters in the direction of D
def encrypt(text):
    # reverse inputText
    text = text[::-1]
    # print(inputText)

    # shift text right
    shifted_text = shiftRight(text)
    return shifted_text
