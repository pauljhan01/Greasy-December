
# Temp Encryption and Decryption until we have a better solution

#Shifts input text to the left by 3 characters
def shiftLeft(inputText):
    #print("Shifting to the left!")
    shiftedText = ""

    for char in inputText:
        asciiCode = (ord(char) - 3)

        # Avoid ' ' and '!'
        # if asciiCode > 126: asciiCode = (asciiCode + 34)
        if asciiCode < 34: asciiCode = (asciiCode + 93)

        shiftedText += chr(asciiCode)
        #print(asciiCode, chr(asciiCode))

    return shiftedText

#Shifts input text to the right by 3 characters
def shiftRight(inputText):
    # print("Shifting to the right!")
    shiftedText = ""

    for char in inputText:
        asciiCode = (ord(char) + 3)
        # Avoid ' ' and '!'
        if asciiCode > 126: asciiCode = (asciiCode + 33) % 126;
        if asciiCode < 34: asciiCode = (asciiCode + 34)
        shiftedText += chr(asciiCode)
        #print(asciiCode, chr(asciiCode))

    return shiftedText

# Reverses input text and calls shiftRight
def encrypt(inputText):

    #reverse inputText
    inputText = inputText[::-1]
    #print(inputText)

    #shift text right
    shiftedText = shiftRight(inputText)
    return shiftedText

# Reverses encrypted text and calls shiftLeft
def decrypt(inputText):
    # reverse inputText
    inputText = inputText[::-1]

    # Shift text left
    shiftedText = shiftLeft(inputText)

    return shiftedText
