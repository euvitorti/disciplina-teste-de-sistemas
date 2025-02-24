package org.example.PrimeiroTesteUnitario;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

class SomaTest {

    @Test
    // Should return the sum of two positive numbers
    void sum() {
        Soma soma = new Soma();
        int result = soma.sum(2, 3);
        assertEquals(5, result);
    }

    @Test
    // Should return the biggest number greater than zero.
    void sumWithZero() {
        Soma soma = new Soma();
        int result = soma.sum(2, 0);
        assertEquals(2, result);
    }

    @Test
    // Should return the result of the operation where a positive number is subtracted by a negative number.
    void sumWithNegativeNumber() {
        Soma soma = new Soma();
        int result = soma.sum(2, -1);
        assertEquals(1, result);
    }
}