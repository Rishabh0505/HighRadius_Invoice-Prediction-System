package com.highradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class AddInvoice
 */
@WebServlet("/AddRecord")
public class AddInvoice extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddInvoice() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		response.getWriter().append("Served at: ").append(request.getContextPath());
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String invoice = null;
		
		try {
			BufferedReader reader = request.getReader();
			invoice = reader.readLine();
			System.out.println(invoice);
//			System.out.println(invoice.getClass().getName());
			
//			System.out.println(invoice.split(","));
//			System.out.println(invoice.split("\"\""));
//			System.out.println(invoice.split(","));
			invoice =  invoice.substring(9,invoice.length()-2);
			//invoice =  invoice.substring(1, invoice.length() - 1);
			String final_values[] = invoice.split(",");
			
			for(int i = 0; i < final_values.length; ++i) {
				final_values[i] = final_values[i].split(":")[1];
				final_values[i] = final_values[i].substring(1, final_values[i].length() - 1);
				System.out.println(final_values[i]);
			}
			
			String business_code = final_values[0];
			String cust_number = final_values[1];
			String clear_date = final_values[2];
			String buisness_year = final_values[3];
			String doc_id = final_values[4];
			String posting_date = final_values[5];
			String document_create_date = final_values[6];
			String due_in_date = final_values[7];
			String invoice_currency = final_values[8];
			String document_type = final_values[9];
			String posting_id = final_values[10];
			String total_open_amount = final_values[11];
			String baseline_create_date = final_values[12];
			String cust_payment_terms = final_values[13];
			String invoice_id = final_values[14];
			
			Connection conn = GetConnection.connectToDB();
			String query = "INSERT INTO winter_internship (business_code, cust_number, clear_date, buisness_year, doc_id, posting_date, document_create_date, due_in_date, invoice_currency, document_type, posting_id, total_open_amount, baseline_create_date, cust_payment_terms, invoice_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
			PreparedStatement st = conn.prepareStatement(query);
			//st.setInt(1, sl_no);
			st.setString(1, business_code);
			st.setString(2, cust_number);
			st.setString(3, clear_date);
			st.setString(4, buisness_year);
			st.setString(5,  doc_id);
			st.setString(6, posting_date);
			st.setString(7, document_create_date);
			st.setString(8, due_in_date);
			st.setString(9, invoice_currency);
			st.setString(10, document_type);
			st.setString(11, posting_id);
			st.setString(12, total_open_amount);
			st.setString(13, baseline_create_date);
			st.setString(14, cust_payment_terms);
			st.setString(15, invoice_id);
			st.executeUpdate();
			response.setStatus(200);
//			conn.commit();
			conn.close();
		}
		catch (IOException e) {
			response.setStatus(500);
			e.printStackTrace();
		}
		catch (SQLException e) {
			response.setStatus(500);
			e.printStackTrace();
		}
		catch (Exception e) {
			response.setStatus(500);
			e.printStackTrace();
		}
	}

}
