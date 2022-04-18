package com.highradius;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
/**
 * Servlet implementation class EditRecord
 */
@WebServlet("/EditRecord")
public class EditRecord extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditRecord() {
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
		// TODO Auto-generated method stub
		String edit = null;
		
		try {
			BufferedReader reader = request.getReader();
			edit = reader.readLine();
			edit = edit.substring(9,  edit.length() - 2);
			String sl = edit.substring(edit.indexOf('[')+1,edit.indexOf(']'));
			String sl_no[]= sl.split(",");
			edit=edit.substring(edit.indexOf(']')+2);
			String splitted[] = edit.split(",");
			
			for(int i = 0; i < splitted.length; ++i) {
				splitted[i] = splitted[i].split(":")[1];
				if(splitted[i].charAt(0) == '\"') {
					splitted[i] = splitted[i].substring(1, splitted[i].length() - 1);
				}
				System.out.println(splitted[i]);
			}
			
			String CURRENCY = splitted[0];
			String TERMS = splitted[1];
			
			Connection conn = GetConnection.connectToDB();
			String sql_statement = "UPDATE winter_internship SET invoice_currency = ?, cust_payment_terms = ? WHERE sl_no = ?";
			for(int i=0;i<sl.length();i++) {
			PreparedStatement st = conn.prepareStatement(sql_statement);
			st.setString(3, sl_no[i]);
			st.setString(2, CURRENCY);
			st.setString(1, TERMS.isEmpty() ? null : TERMS);
			System.out.println(st);
			st.executeUpdate();
			}
			conn.close();
		}
		catch(Exception e) {
			response.setStatus(500);
		}
	}

}