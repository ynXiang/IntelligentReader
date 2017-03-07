#include <iostream>
#include <stdio.h>
#include <fstream>
#include <sstream>
#include <stdlib.h>
#include <string.h>
#include <map>
#include <list>
#include <vector>
#include <math.h>
#include <time.h>

using namespace std;

struct PV{
    int pos, best_pos;
    double v;
};

const int num_it = 400;
const int number = 20;
const int w = 1;
const int c1 = 1;
const int c2 = 1;
const double alpha = 1.5;
const double beta = 0.5;
const double init_fit = 100;
/*
The variance of segment length is greater.
If it is fewer, use the data below.
const double alpha = 1.5;
const double beta = 0.5;
*/

// Save all sentences.
// insert vector for topics, count again and each has a map for word_count.

int main(int argc, char* argv[]){
    map<string, int> word_list;
    map<string, int>::iterator word_it;
    map<int, list<int> > sentence_list;
    map<int, list<int> >::iterator sent_it;
    list<int> new_sentence;
    vector<int> pos_count;
    fstream file;
    if (argc == 2) file.open(argv[1]);
    else{
    	cout << "./chap_auto_dividing text_name.txt" << endl;
    	return 0;
    }
    stringstream ss;
    string str,strback = "";
    int word_count = 0, sent_count = 0;
    bool new_sent = false;
    if(!file.is_open()){
	cout << "Error: opening file is failed." << endl;
	exit(0);
    }
    else{
		string line;
		while(getline(file,line)){
			ss.clear();
			ss << line;
			while (!ss.eof()){
				new_sent = false;
				ss >> str;
				strback += str + " ";
				for (unsigned int i = 0; i < str.length(); i++){
				if (str[i] >= 0x41 && str[i] <= 0x5A) str[i] = str[i] + 0x20; 
				}
				if (str[str.length()-1] == 0x21 || str[str.length()-1] == 0x2E || str[str.length()-1] == 0x3F || ss.eof()){
				new_sent = true;
				pos_count.push_back(strback.length());
				}
				if (str[str.length()-1] == 0x0D) strback+=0x0D;
				while (str.length() >= 1 && (str[str.length()-1] < 0x41 || (str[str.length()-1] > 0x5A && str[str.length()-1] < 0x61) || str[str.length()-1] > 0x7A)){
				str.erase(str.end()-1);
				}
				pair<map<string, int>::iterator, bool> ret;
				ret = word_list.insert(pair<string, int>(str, word_count));
				if (ret.second) word_count++;
				new_sentence.push_back(ret.first->second);
				if (new_sent){
				new_sentence.sort();
				sentence_list.insert(pair<int, list<int> >(sent_count, new_sentence));
				sent_count++;
				new_sentence.clear();
				}
			}
			strback += "\r\n";
		}
    }
    file.close();
    int word_num = word_list.size();
    int sent_num = sentence_list.size();
    double** freq = new double*[sent_num];
    for (int i = 0; i < sent_num; i++){
		freq[i] = new double[word_num];
    }
    for (int i = 0; i < sent_num; i++){
		for (int j = 0; j < word_num; j++) freq[i][j] = 0;
    }
    for (sent_it = sentence_list.begin(); sent_it != sentence_list.end(); ++sent_it){
		list<int>::iterator list_it = sent_it->second.begin();
		while (list_it != sent_it->second.end()){
			freq[sent_it->first][*list_it]++;
			++list_it;
		}
    }
    double** sim = new double*[sent_num];
    for (int i = 0; i < sent_num; i++){
		sim[i] = new double[sent_num];
    }
    for (int i = 0; i < sent_num; i++){
		for (int j = 0; j < i; j++){
			double sum_ij = 0, sum_i = 0, sum_j = 0;
			for (int k = 0; k < word_num; k++){
				sum_ij += freq[i][k] * freq[j][k];
				sum_i += freq[i][k] * freq[i][k];
				sum_j += freq[j][k] * freq[j][k];
			}
			sim[i][j] = sum_ij / sqrt(sum_i * sum_j);
			sim[j][i] = sum_ij / sqrt(sum_i * sum_j);
		}
    }
    for (int i = 0; i < sent_num; i++){
		sim[i][i] = 0;
    }
    int** D = new int*[sent_num];
    for (int i = 0; i < sent_num; i++){
		D[i] = new int[sent_num];
    }
    for (int i = 0; i < sent_num; i++){
		for (int j = 0; j < sent_num; j++){
			if (sim[i][j] == 0) D[i][j] = 1;
			else if (sim[i][j] > 0) D[i][j] = 0;
			else{
				exit(0);
			}
		}
    }
    int seg[number];
    for (int i = 0; i < number; i++){
		seg[i] = i * sent_num / (2*number);
		if (seg[i] <= 1) seg[i] = 2;
    }
    int bound[number][seg[number-1]-1];
    memset(bound, 0, sizeof(bound));
    PV pv[number][sent_num-1];
    srand(time(NULL));
    for (int i = 0; i < number; i++){
		for (int j = 0; j < sent_num-1; j++){
			pv[i][j].pos = 0;
			pv[i][j].v = rand()/double(RAND_MAX);
			pv[i][j].best_pos = 0;
		}
		int position[seg[i]-1];
		for (int k = 0; k < seg[i]-1; k++){
			position[k] = (k+1) * sent_num / seg[i] -1 + rand() % 3;
			if (k > 0){
			if (position[k] <= position[k-1]) position[k] = position[k-1] + 1;
			}
			pv[i][position[k]].pos = 1;
			pv[i][position[k]].best_pos = 1;
			bound[i][k] = position[k];
		}
    }
    double best_fit[number];
    memset(best_fit, init_fit, sizeof(best_fit));
    int swarm_best_pos[sent_num-1];
    memset(swarm_best_pos, 0, sizeof(swarm_best_pos));
    double swarm_best_fit = init_fit;
    double sum_internal[number];
    memset(sum_internal, 0, sizeof(sum_internal));
    double sum_external[number];
    memset(sum_external, 0, sizeof(sum_external));
    double stdev[number];
    memset(stdev, 0, sizeof(stdev));
    double fit[number];
    memset(fit, 0, sizeof(fit));
    for (int cont = 0; cont < num_it; cont++){
		//iteration start from here!
		memset(sum_internal, 0, sizeof(sum_internal));
		memset(sum_external, 0, sizeof(sum_external));
		memset(stdev, 0, sizeof(stdev));
		memset(fit, 0, sizeof(fit));
		for (int i = 0; i < number; i++){
			for (int j = 0; j < seg[i]; j++){
				double sim_count = 0, start_pos, end_pos;
				if (j == 0) start_pos = 0;
				else start_pos = bound[i][j-1];
				if (j == seg[i]-1) end_pos = sent_num;
				else end_pos = bound[i][j];
				double length = end_pos - start_pos;
				if (length <= 0){
					cout << "Error: length is or below 0" << endl;
					exit(0);
				}
				for (int row = start_pos; row < end_pos; row++){
					for (int col = start_pos; col < end_pos; col++){
						sim_count += D[row][col];
					}
				}
				sum_internal[i] += sim_count / length / length;
			}
		}
		for (int i = 0; i < number; i++){
			for (int j = 0; j < seg[i]-1; j++){
				double sim_count = 0, start_pos, mid_pos, end_pos;
				if (j == 0) start_pos = 0;
				else start_pos = bound[i][j-1];
				mid_pos = bound[i][j];
				if (j == seg[i]-2) end_pos = sent_num;
				else end_pos = bound[i][j+1];
				double length1 = mid_pos - start_pos, length2 = end_pos - mid_pos;
				if (length1 <= 0 || length2 <= 0){
					cout << "Error: length is or below 0" << endl;
					exit(0);
				}
				for (int row = start_pos; row < mid_pos; row++){
				for (int col = mid_pos; col < end_pos; col++){
					sim_count += D[row][col];
				}
				}
				sum_external[i] += sim_count / length1 / length2;
			}
		}
		for (int i = 0; i < number; i++){
			double sum_seg = 0, mean = sent_num / seg[i];
			for (int j = 0; j < seg[i]; j++){
				int start_pos, end_pos;
				if (j == 0) start_pos = 0;
				else start_pos = bound[i][j-1];
				if (j == seg[i]-1) end_pos = sent_num;
				else end_pos = bound[i][j];
				int length = end_pos - start_pos;
				if (length <= 0){
					cout << "Error: length is or below 0" << endl;
					exit(0);
				}
				sum_seg += (length - mean) * (length - mean);
			}
			stdev[i] = sqrt(sum_seg / seg[i]);
		}
		for (int i = 0; i < number; i++){
			fit[i] = sum_internal[i]/seg[i] - sum_external[i]/(seg[i]-1) + stdev[i]*alpha + seg[i]/sent_num*beta;
		}
		int best_it = number;
		for (int i = 0; i < number; i++){
			if (fit[i] < best_fit[i]){
				best_fit[i] = fit[i];
				for (int j = 0; j < sent_num-1; j++) pv[i][j].best_pos = pv[i][j].pos;
			}
			if (fit[i] < swarm_best_fit){
				swarm_best_fit = fit[i];
				best_it = i;
			}
		}
		if (best_it != number){
			for (int i = 0; i < sent_num-1; i++) swarm_best_pos[i] = pv[best_it][i].pos;
		}
		for (int i = 0; i < number; i++){
			for (int j = 0; j < sent_num-1; j++){
				pv[i][j].v = w*pv[i][j].v + c1*rand()/double(RAND_MAX)*(pv[i][j].best_pos-pv[i][j].pos) + c2*rand()/double(RAND_MAX)*(swarm_best_pos[j] - pv[i][j].pos);
				if (rand()/double(RAND_MAX) < 1/(1+exp(-pv[i][j].v))) pv[i][j].pos = 1;
				else pv[i][j].pos = 0;
			}
		}
		//end of each iteration.
    }

    int i_count = 0;
    for (int i = 0; i < sent_num; i++){
		if (swarm_best_pos[i] == 1){
			strback.insert(pos_count.at(i)+i_count,"|");
			i_count++;
		}
    }

    int word_cloud_num = 20;
    if (word_cloud_num > word_num) word_cloud_num = word_num;
    list<int>* freq_sort = new list<int>[i_count+1];
    for (int i = 0; i < i_count+1; i++){
		for (int j = 0; j < word_num; j++) freq_sort[i].push_back(0);
	}
	multimap<int, int>* freq_map = new multimap<int, int>[i_count+1];
	string word_cloud[i_count+1][word_cloud_num];


	int i_pos = 0;
	for (int i = 0; i < sent_num; i++){
		int count = 0;
		for (list<int>::iterator it = freq_sort[i_pos].begin(); it != freq_sort[i_pos].end(); ++it){
			*it += freq[i][count];
			count++;
		}
		if (swarm_best_pos[i]) i_pos++;
	}
	for (int i = 0; i < i_count+1; i++){
		int count = 0;
		for (list<int>::iterator it = freq_sort[i].begin(); it != freq_sort[i].end(); ++it){	 
		   freq_map[i].insert(pair<int, int>(*it, count));
			count++;
		}
	}
	string cust_word[] = {"i","me","my","myself","we","us","our","ours","ourselves","you","your","yours","yourself","yourselves","he","him","his","himself","she",
"her","hers","herself","it","its","itself","they","them","their","theirs","what","which","who","whom","whose","this","that","these","those",
"am","is","are","was","were","be","been","being","have","has","had","having","do","does","did","doing","will","would","should","can","could",
"ought","i'm","you're","he's","she's","it's","we're","they're","i've","you've","we've","they've","i'd","you'd","he'd","she'd","we'd",
"they'd","i'll","you'll","he'll","she'll","we'll","they'll","isn't","aren't","wasn't","weren't","hasn't","haven't","hadn't","doesn't","don't",
"didn't","won't","wouldn't","shan't","shouldn't","can't","cannot","couldn't","mustn't","let's","that's","who's","what's","here's","there's",
"when's","where's","why's","how's","a","an","the","and","but","if","or","because","as","until","while","of","at","by","for","with","about",
"against","between","into","through","during","after","above","below","to","from","up","upon","down","in","out","on","off","over","under",
"again","further","then","once","here","there","when","where","why","how","all","any","both","each","few","more","most","other","some","such",
"no","nor","not","only","own","same","so","than","too","very","say","says","said","shall",""};
	for (int i = 0; i < i_count+1; i++){
		freq_sort[i].sort();
		int count = 0;
		while (count < word_cloud_num){
			bool custom = false;
			map<string, int>::iterator word_it = word_list.begin();	
			for (int k = 0; k < freq_map[i].find(freq_sort[i].back())->second; k++) ++word_it;
			word_cloud[i][count] = word_it->first;
			for (int t = 0; t < 182; t++){
				if (word_it->first == cust_word[t]){
					custom = true;
					break;
				}
			}
			freq_map[i].erase(freq_map[i].find(freq_sort[i].back()));
			freq_sort[i].pop_back();
			if (!custom) count++;
		}
	}

    ofstream fout("text.txt");
    if(!fout.is_open()){
		cout << "Error: opening file is failed." << endl;
		exit(0);
    }
    else{
		fout << strback << endl;
    }
    fout.close();
    cout << "Output text: text.txt" << endl;

    ofstream fword("word.txt");
    if(!fword.is_open()){
		cout << "Error: opening file is failed." << endl;
		exit(0);
    }
    else{
		for (int i = 0; i < i_count+1; i++){
			for (int j = 0; j < word_cloud_num; j++){
				fword << word_cloud[i][j] << endl;
			}
			fword << ">" << endl;
		}
    }
    fword.close();
    cout << "Output word list: word.txt" << endl;

    cout << "best_fit=" << swarm_best_fit << endl;

    for (int i = 0; i < sent_num; i++){
		delete [] freq[i];
		delete [] sim[i];
		delete [] D[i];
    }
    delete [] freq;
    delete [] sim;
    delete [] D;
    delete [] freq_sort;
    delete [] freq_map;
    return 0;
}
